import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { GeoJsonProperties, Point } from "geojson";
import { executeSql } from "../../common/helpers";
import { colors, customMapStyle } from "../../common/styles";
import { MapContext } from "../../contexts";
import { processFeature } from "./helpers";
import { IFeatureScreen } from "./interfaces";

const FeatureScreen = ({ navigation, route }: IFeatureScreen) => {
  // destructure route params
  const { id, name } = route.params;

  // context hooks
  const { featuresDatabase, feature, setFeature } = useContext(MapContext);

  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng | undefined>(undefined);
  const [latLng, setLatLng] = useState<string | undefined>(undefined);
  const [properties, setProperties] = useState<GeoJsonProperties | null>(null);
  const [region, setRegion] = useState<Region | undefined>(undefined);

  // ref hooks
  const mapRef: React.MutableRefObject<MapView | null> = useRef(null);

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
    if (featuresDatabase) {
      const sqlStatement = `
        SELECT *
        FROM features
        WHERE id = '${id}';
      `;
      executeSql!(featuresDatabase, sqlStatement, [])
        .then((resultSet: any) => {
          const feature = processFeature(resultSet);
          setFeature(feature);
        })
        .catch((error: any) => {
          // TODO: HANDLE THIS ERROR
          console.log(error);
        });
    }
  }, [id]);

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

  const featureName = <Text style={styles.name}>{properties?.name}</Text>;

  return (
    <View style={styles.container}>
      <View pointerEvents={"none"} style={styles.mapContainer}>
        {coordinate && region && (
          <MapView
            customMapStyle={customMapStyle}
            provider={"google"}
            ref={mapRef}
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
        {featureName}
        {countyState}
        {countryContinent}
        {elevation}
        <Text style={styles.coordinate}>{latLng}</Text>
      </View>
    </View>
  );
};

export default FeatureScreen;

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
    height: "50%",
  },
  map: {
    flex: 1,
  },
  name: {
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 30,
  },
});
