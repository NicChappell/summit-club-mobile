import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import { GeoJsonProperties, Point } from "geojson";
import { ErrorOverlay } from "../../common/components";
import { executeSql, getFeaturePhoto } from "../../common/helpers";
import { borderReset, colors, customMapStyle } from "../../common/styles";
import { FeaturesContext } from "../../contexts";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { processFeature } from "./helpers";
import { IFeatureScreen } from "./interfaces";

type Props = PropsFromRedux & IFeatureScreen;

const FeatureScreen = ({ error, navigation, route, setError }: Props) => {
  // destructure route params
  const { id: featureId, name: featureName } = route.params;

  // context hooks
  const {
    feature,
    featureFilters,
    features,
    featuresDatabase,
    featuresCollectionRef,
    setFeature,
    setFeatures,
    setFeatureFilters,
  } = useContext(FeaturesContext);

  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng | undefined>(undefined);
  const [latLng, setLatLng] = useState<string | undefined>(undefined);
  const [properties, setProperties] = useState<GeoJsonProperties | null>(null);
  const [region, setRegion] = useState<Region | undefined>(undefined);

  // effect hooks
  useEffect(() => {
    // reset the selected feature data
    return () => setFeature(undefined);
  }, []);

  useEffect(() => {
    if (coordinate) {
      const { latitude, longitude } = coordinate;

      const xCardinal = longitude >= 0 ? "E" : "W";
      const yCardinal = latitude >= 0 ? "N" : "S";

      setLatLng(`${latitude}° ${yCardinal}, ${longitude}° ${xCardinal}`);
    }
  }, [coordinate]);

  useEffect(() => {
    if (feature) {
      // destructure feature
      const { geometry, properties } = feature;

      // destructure geometry
      const coordinates = (geometry as Point).coordinates;

      // format marker coordinate
      const coordinate: LatLng = {
        latitude: coordinates[1],
        longitude: coordinates[0],
      };

      // format map region
      const region: Region = {
        latitude: coordinates[1],
        longitude: coordinates[0],
        latitudeDelta: 0.075,
        longitudeDelta: 0.075,
      };

      // update state
      setCoordinate(coordinate);
      setProperties(properties);
      setRegion(region);
    }
  }, [feature]);

  useEffect(() => {
    console.log(featuresDatabase);
    if (featuresDatabase) {
      const sqlStatement = `
        SELECT *
        FROM features
        WHERE id = '${featureId}';
      `;
      executeSql!(featuresDatabase, sqlStatement, [])
        .then((resultSet) => {
          const feature = processFeature(resultSet);
          console.log(feature);
          setFeature(feature);
        })
        .catch((error) => {
          setError({
            code: error.code,
            message: error.message,
          });
        });
    }
  }, [featureId]);

  const countyState =
    properties?.county && properties?.state ? (
      <Text style={styles.hierarchy}>
        {`${properties?.county} County, ${properties?.state}`}
      </Text>
    ) : null;

  const countryContinent =
    properties?.country && properties?.continent ? (
      <Text style={styles.hierarchy}>
        {`${properties?.country}, ${properties?.continent}`}
      </Text>
    ) : null;

  const elevation = (
    <Text style={styles.elevation}>
      {`${properties?.feet.toLocaleString()} ft / ${properties?.meters.toLocaleString()} m`}
    </Text>
  );

  const title = <Text style={styles.featureName}>{properties?.name}</Text>;

  return (
    <ScrollView style={styles.scrollView}>
      <ErrorOverlay error={error} />
      <View style={styles.container}>
        <ImageBackground
          source={getFeaturePhoto(properties?.name)}
          style={styles.featureImageBackground}
        >
          <View style={styles.featureImageBackgroundView}>
            <Text style={styles.featureImageBackgroundText}>
              {properties?.name}
            </Text>
          </View>
        </ImageBackground>
        <View pointerEvents={"none"} style={styles.mapContainer}>
          {coordinate && region && (
            <MapView
              customMapStyle={customMapStyle}
              provider={"google"}
              region={region}
              style={styles.map}
            >
              <Circle
                center={coordinate}
                fillColor={colors.queenBlue50}
                radius={500}
                strokeColor={colors.queenBlue}
                strokeWidth={2.5}
              />
            </MapView>
          )}
        </View>
        <View style={styles.featurePropertiesContainer}>
          {title}
          {countyState}
          {countryContinent}
          {elevation}
          <Text style={styles.coordinate}>{latLng}</Text>
        </View>
      </View>
    </ScrollView>
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

export default connector(FeatureScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  coordinate: {
    fontFamily: "NunitoSans_400Regular",
  },
  elevation: {
    fontFamily: "NunitoSans_400Regular",
  },
  featureImageBackground: {
    ...borderReset,
    alignItems: "flex-end",
    height: 256,
    justifyContent: "flex-end",
    width: "100%",
  },
  featureImageBackgroundText: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featureImageBackgroundView: {
    backgroundColor: colors.black75,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  featureName: {
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 30,
  },
  featurePropertiesContainer: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  hierarchy: {
    fontFamily: "NunitoSans_400Regular",
  },
  mapContainer: {
    width: "100%",
    height: 256,
  },
  map: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
