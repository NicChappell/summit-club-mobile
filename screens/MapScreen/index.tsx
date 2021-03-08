import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import MapView, {
  Callout,
  Camera,
  LatLng,
  MapEvent,
  Marker,
  Polygon,
  Region,
} from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { connect, ConnectedProps } from "react-redux";
import { Feature, Geometry, GeoJsonProperties, Point } from "geojson";
import * as actions from "../../redux/actions";
import { ErrorOverlay } from "../../common/components";
import { colors, customMapStyle } from "../../common/styles";
import { IMapBoundaries } from "../../common/interfaces";
import { MapContext } from "../../contexts";
import { RootState } from "../../redux/reducers";
import { CalloutView, MarkerView } from "./components";
import {
  featureFilters,
  initialMapBoundaries,
  initialRegion,
} from "./constants";
import {
  countFeatureRows,
  createFeaturesTable,
  dropFeaturesTable,
  filterFeaturesWithinBounds,
  getCurrentCounty,
  getPolygonCoordinates,
  mergeResultSet,
  populateFeaturesTable,
  processResultSet,
  queryFeaturesTable,
  resetResultSet,
} from "./helpers";
import { IMapScreen } from "./interfaces";

import { COLORADO_COUNTIES } from "./STUB";

type Props = PropsFromRedux & IMapScreen;

const MapScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [cameraConfig, setCameraConfig] = useState<Camera | undefined>(
    undefined
  );
  const [countiesPolygonCoordinates, setCountiesPolygonCoordinates] = useState<
    LatLng[][] | undefined
  >([[]]);
  const [currentCounty, setCurrentCounty] = useState<string | undefined>(
    undefined
  );
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [mapBoundaries, setMapBoundaries] = useState<IMapBoundaries>(
    initialMapBoundaries
  );
  const [mapMarkers, setMapMarkers] = useState<
    Feature<Geometry, GeoJsonProperties>[]
  >([]);

  // context hooks
  const {
    featuresDatabase,
    feature,
    features,
    featuresCollectionRef,
    setFeature,
    setFeatures,
  } = useContext(MapContext);

  // ref hooks
  const mapRef = useRef<MapView>(null);

  // effect hooks
  useEffect(() => {
    // if (featuresDatabase && featuresCollectionRef) {
    //   dropFeaturesTable(featuresDatabase);
    //   createFeaturesTable(featuresDatabase, featuresCollectionRef);
    // }
  }, []);

  useEffect(() => {
    // return early if cameraConfig is undefined
    if (!cameraConfig) return;

    // TODO: ANYTIME THE CAMERA CHANGES, UPDATE THE HEADER BASED ON WHAT COUNTY THE CENTER POINT IS
  }, [cameraConfig]);

  // effect hooks
  useEffect(() => {
    currentCounty
      ? navigation.setOptions({ title: `${currentCounty} County` })
      : navigation.setOptions({ title: "Search Summits" });
  }, [currentCounty]);

  useEffect(() => {
    // return early if features is undefined
    if (!features) return;

    // sort features in descending order
    const sortedFeatures = features?.sort(
      (featureA, featureB) =>
        featureB.properties?.feet - featureA.properties?.feet
    );

    // slice (up to) the first 64 features
    const slicedFeatures = sortedFeatures!.slice(0, 64);

    // update component state
    setMapMarkers(slicedFeatures!);
  }, [features]);

  useEffect(() => {
    // return early if mapBoundaries is undefined
    if (!mapBoundaries) return;

    // TODO: DO SOMETHING WITH THE MAP BOUNDARIES?
  }, [mapBoundaries]);

  useEffect(() => {
    // return early if mapRef is null
    if (!mapRef) return;

    // get current camera config
    mapRef
      .current!.getCamera()
      .then((cameraConfig) => {
        // set current camera config
        setCameraConfig(cameraConfig);

        // TEST COUNT
        countFeatureRows(
          featuresDatabase!,
          featureFilters,
          setError,
          setIsWaiting
        );

        // initial database query
        queryFeaturesTable(
          features,
          featuresDatabase!,
          featureFilters,
          mapBoundaries,
          setError,
          setIsWaiting
        ).then((features) =>
          // update MapContext
          setFeatures(features)
        );
      })
      .catch((error) => {
        // TODO: HANDLE THIS ERroR
        console.log(error);
      });

    // get counties overlay polygon coordinates
    const polygonCoordiantes = getPolygonCoordinates(
      COLORADO_COUNTIES.features
    );
    // set counties overlay polygon coordinates
    setCountiesPolygonCoordinates(polygonCoordiantes);

    // set current map boundaries
    mapRef.current
      ?.getMapBoundaries()
      .then((mapBoundaries) => setMapBoundaries(mapBoundaries));
  }, [mapRef]);

  const handleMarkerPress = (event: MapEvent) => {
    // destructure event
    const {
      nativeEvent: { coordinate },
    } = event;

    // animate map to coordinate
    mapRef.current?.animateCamera({ center: coordinate }, { duration: 250 });
  };

  const handleRegionChange = (region: Region) => {};

  const handleRegionChangeComplete = async (region: Region) => {
    // return early if mapRef is null
    if (!mapRef) return;

    // ------------------------------------------------------
    // ----------------- GET CURRENT COUNTY -----------------
    // ------------------------------------------------------

    // use region to format point array
    const point: number[] = [region.longitude, region.latitude];

    // use region center point to get the current county
    const currentCounty: Feature | undefined = getCurrentCounty(
      COLORADO_COUNTIES.features,
      point
    );

    // update state
    setCurrentCounty(currentCounty?.properties?.name);

    // ------------------------------------------------------
    // ---- FILTER FEATURES FROM STATE USING MAP BOUNDS -----
    // ------------------------------------------------------

    // get previous camera config
    const prevCameraConfig = cameraConfig;

    // get current camera config
    const currentCameraConfig = await mapRef.current!.getCamera();

    // update state
    setCameraConfig(currentCameraConfig);

    // get current map boundaries
    const currentMapBoundaries = await mapRef.current!.getMapBoundaries();

    // update state
    setMapBoundaries(currentMapBoundaries!);

    // filter features within current map bounds
    const filteredFeatures = filterFeaturesWithinBounds(
      features,
      currentMapBoundaries
    );
    console.log(filteredFeatures?.slice(0, 64).length);

    // sort filtered features in descending order
    const sortedFeatures = filteredFeatures?.sort(
      (featureA, featureB) =>
        featureB.properties?.feet - featureA.properties?.feet
    );

    // slice (up to) the first 64 features
    const slicedFeatures = sortedFeatures!.slice(0, 64);

    // update component state
    setMapMarkers(slicedFeatures!);

    // // requery database if zoom levels have changed
    // if (prevCameraConfig?.zoom !== currentCameraConfig?.zoom) {
    //   // query database
    //   const newFeatures = await queryFeaturesTable(
    //     featuresDatabase!,
    //     currentMapBoundaries
    //   );

    //   // mergeResultSet(newFeatures!);
    //   resetResultSet(newFeatures!);
    // }
  };

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      {isWaiting && (
        <ActivityIndicator
          color={colors.black25}
          size="small"
          style={styles.activityIndicator}
        />
      )}
      {!isWaiting && (
        <Ionicons
          color={colors.black25}
          name={"add-outline"}
          size={24}
          style={styles.translatingIndicator}
        />
      )}
      <MapView
        customMapStyle={customMapStyle}
        initialRegion={initialRegion}
        loadingEnabled={true}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        pitchEnabled={false}
        provider={"google"}
        ref={mapRef}
        style={styles.map}
      >
        {mapMarkers?.map((feature) => {
          // destructure feature
          const geometry = feature.geometry;
          const properties = feature.properties;

          // destructure geometry
          const coordinates = (geometry as Point).coordinates;

          // format marker coordinate
          const coordinate: LatLng = {
            latitude: coordinates[1],
            longitude: coordinates[0],
          };

          return (
            <Marker
              key={properties!.id}
              coordinate={coordinate}
              onPress={handleMarkerPress}
              tracksViewChanges={false}
            >
              <MarkerView properties={properties} />
              <Callout
                onPress={() =>
                  navigation.navigate("Feature", {
                    id: properties?.id,
                    name: properties?.name,
                  })
                }
              >
                <CalloutView properties={properties} />
              </Callout>
            </Marker>
          );
        })}
        {countiesPolygonCoordinates?.map((coordiantes, index) => (
          <Polygon
            coordinates={coordiantes}
            fillColor={"transparent"}
            key={index}
            strokeColor={colors.queenBlue50}
          ></Polygon>
        ))}
      </MapView>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MapScreen);

const styles = StyleSheet.create({
  activityIndicator: {
    position: "absolute",
    zIndex: 1,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  translatingIndicator: {
    position: "absolute",
    zIndex: 1,
  },
});
