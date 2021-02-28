import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import MapView, {
  Callout,
  Camera,
  LatLng,
  MapEvent,
  Marker,
  Region,
} from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Feature, GeoJsonProperties, Point } from "geojson";
import * as actions from "../../redux/actions";
import { ErrorOverlay } from "../../common/components";
import { colors, customMapStyle } from "../../common/styles";
import { IMapBoundaries } from "../../common/interfaces";
import { MapContext } from "../../contexts";
import { RootState } from "../../redux/reducers";
import { CalloutView, MarkerView } from "./components";
import { initialMapBoundaries, initialRegion } from "./constants";
import { processResultSet } from "./helpers";
import { IMapScreen } from "./interfaces";

type Props = PropsFromRedux & IMapScreen;

const MapScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [cameraConfig, setCameraConfig] = useState<Camera | undefined>(
    undefined
  );
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [mapBoundaries, setMapBoundaries] = useState<IMapBoundaries>(
    initialMapBoundaries
  );

  // context hooks
  const {
    featuresDatabase,
    executeSql,
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
    // return early if cameraConfig is undefined
    if (!cameraConfig) return;

    // TODO: DO SOMETHING WITH THE CAMERA CONFIGURATION?
  }, [cameraConfig]);

  useEffect(() => {
    // return early if mapBoundaries is undefined
    if (!mapBoundaries) return;

    // TODO: DO SOMETHING WITH THE MAP BOUNDARIES?
  }, [mapBoundaries]);

  useEffect(() => {
    // return early if mapRef is null
    if (!mapRef) return;

    // set current camera config
    mapRef.current
      ?.getCamera()
      .then((cameraConfig) => {
        setCameraConfig(cameraConfig);

        queryFeaturesTable(featuresDatabase!, mapBoundaries).then(
          (features) => {
            // update state
            setFeatures(features);
          }
        );
      })
      .catch((error) => {
        // TODO: HANDLE THIS ERroR
        console.log(error);
      });

    // set current map boundaries
    mapRef.current?.getMapBoundaries().then((mapBoundaries) => {
      setMapBoundaries(mapBoundaries);
    });
  }, [mapRef]);

  // useEffect(() => {
  //   if (featuresDatabase && featuresCollectionRef) {
  //     dropFeaturesTable(featuresDatabase);
  //     createFeaturesTable(featuresDatabase, featuresCollectionRef);
  //   }
  // }, []);

  const handleMarkerPress = (event: MapEvent) => {
    // destructure event
    const {
      nativeEvent: { coordinate },
    } = event;

    // animate map to coordinate
    mapRef.current?.animateCamera(
      { center: coordinate, zoom: 12 },
      { duration: 666 }
    );
  };

  const handleRegionChange = (region: Region) => {
    // TODO: DO SOMETHING WHENEVER THE REGION CHANGES?
  };

  const handleRegionChangeComplete = async (region: Region) => {
    // get previous camera config
    const prevCameraConfig = cameraConfig;

    // get current camera config
    const currentCameraConfig = await mapRef.current?.getCamera();

    // update state
    setCameraConfig(currentCameraConfig);

    // get current map boundaries
    const currentMapBoundaries = await mapRef.current?.getMapBoundaries();

    // update state
    setMapBoundaries(currentMapBoundaries!);

    // query database
    const newFeatures = await queryFeaturesTable(
      featuresDatabase!,
      currentMapBoundaries
    );

    // compare zoom levels and requery database
    prevCameraConfig?.zoom === currentCameraConfig?.zoom
      ? mergeResultSet(newFeatures!)
      : resetResultSet(newFeatures!);
  };

  const createFeaturesTable = async (
    featuresDatabase: SQLite.WebSQLDatabase,
    featuresCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => {
    try {
      const sqlStatement = `
        CREATE TABLE IF NOT EXISTS features (
          class TEXT,
          continent TEXT,
          country TEXT,
          county TEXT,
          feet INTEGER,
          id INTEGER,
          latitude REAL,
          longitude REAL,
          meters INTEGER,
          name TEXT,
          state TEXT
        );
      `;
      await executeSql!(featuresDatabase, sqlStatement, []);

      populateFeaturesTable(featuresDatabase, featuresCollectionRef);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const dropFeaturesTable = async (featuresDatabase: SQLite.WebSQLDatabase) => {
    try {
      await executeSql!(featuresDatabase, `DROP TABLE IF EXISTS features;`, []);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const populateFeaturesTable = async (
    featuresDatabase: SQLite.WebSQLDatabase,
    featuresCollectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => {
    try {
      // retrieve data from firestore
      const snapshot = await featuresCollectionRef
        .where("properties.class", "==", "Summit")
        .get();

      // collect firestore documents
      const documents: firebase.firestore.DocumentData[] = [];
      snapshot.forEach((doc) => {
        // retrieve all document fields as an object
        // NOTE: data object is equivalent to a GeoJSON Feature object
        const document = doc.data();

        // add document id to feature properties
        document.properties.id = doc.id;

        // push document into documents array
        documents.push(document);
      });

      // wait for all database transactions to finish
      const sqlStatement = `
        INSERT INTO features (
          class,
          continent,
          country,
          county,
          feet,
          id,
          latitude,
          longitude,
          meters,
          name,
          state
        ) VALUES (
          ?,?,?,?,?,?,?,?,?,?,?
        );
      `;
      for (const document of documents) {
        // destructure properties from document
        const { properties } = document;

        // format arguments
        const args = [
          properties.class,
          properties.continent,
          properties.country,
          properties.county,
          properties.feet,
          properties.id,
          properties.latitude,
          properties.longitude,
          properties.meters,
          properties.name,
          properties.state,
        ];

        await executeSql!(featuresDatabase, sqlStatement, args);
      }

      // query features table
      queryFeaturesTable(featuresDatabase, mapBoundaries);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const queryFeaturesTable = async (
    featuresDatabase: SQLite.WebSQLDatabase,
    mapBoundaries: IMapBoundaries = initialMapBoundaries
  ) => {
    try {
      // start activity indicator
      setIsWaiting(true);

      // destructure map boundaries
      const northEast = mapBoundaries.northEast;
      const southWest = mapBoundaries.southWest;

      // destructure northeast coordinates
      const neLat = northEast?.latitude;
      const neLng = northEast?.longitude;

      // destructure southwest coordinates
      const swLat = southWest?.latitude;
      const swLng = southWest?.longitude;

      const sqlStatement = `
        SELECT *
        FROM features
        WHERE latitude < ${neLat}
        AND longitude < ${neLng}
        AND latitude > ${swLat}
        AND longitude > ${swLng}
        ORDER BY meters DESC
        LIMIT 64;
      `;
      const resultSet: any = await executeSql!(
        featuresDatabase,
        sqlStatement,
        []
      );
      console.log("resultSet.rows._array.length", resultSet.rows._array.length);

      // convert resultSet into GeoJSON FeatureCollection
      const { features } = processResultSet(resultSet);

      // stop activity indicator
      setIsWaiting(false);

      return features;
    } catch (error) {
      // stop activity indicator
      setIsWaiting(false);

      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const mergeResultSet = (newFeatures: Feature<Point, GeoJsonProperties>[]) => {
    // get previous features
    const prevFeatures = features;

    // create new Set of feature ids
    const prevFeatureIds = new Set(
      prevFeatures?.map((feature) => feature.properties?.id)
    );

    // merge and dedupe feature arrays
    const mergedFeatures = [
      ...prevFeatures!,
      ...newFeatures.filter(
        (feature) => !prevFeatureIds.has(feature.properties?.id)
      ),
    ];

    // update state
    setFeatures(mergedFeatures);
  };

  const resetResultSet = (newFeatures: Feature<Point, GeoJsonProperties>[]) => {
    // update state
    setFeatures(newFeatures);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ErrorOverlay error={error} />
      {isWaiting && (
        <ActivityIndicator
          color={colors.black25}
          size="large"
          style={styles.activityIndicator}
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
        {features?.map((feature) => {
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
                  navigation.navigate("Feature", { name: properties?.name })
                }
              >
                <CalloutView properties={properties} />
              </Callout>
            </Marker>
          );
        })}
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
});
