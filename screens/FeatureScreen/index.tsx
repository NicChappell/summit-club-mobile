import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { GeoJsonProperties, Point } from "geojson";
import { useFonts, NotoSansJP_700Bold } from "@expo-google-fonts/noto-sans-jp";
import { NunitoSans_400Regular } from "@expo-google-fonts/nunito-sans";
import { colors } from "../../common/styles";
import { LatLng, Region } from "../../common/types";
import { MapContext } from "../../contexts";
import { processFeature } from "./helpers";
import { IFeatureScreen } from "./interfaces";

const FeatureScreen = ({ navigation, route }: IFeatureScreen) => {
  // destructure route params
  const { name } = route.params;

  // context hooks
  const { database, executeSql, feature, setFeature } = useContext(MapContext);

  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng | undefined>(undefined);
  const [properties, setProperties] = useState<GeoJsonProperties | null>(null);
  const [region, setRegion] = useState<Region | undefined>(undefined);
  console.log(coordinate, region);

  // ref hooks
  const mapRef: React.MutableRefObject<MapView | null> = useRef(null);

  // effect hooks
  useEffect(() => {
    // reset the selected feature data
    return () => setFeature(undefined);
  }, []);

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
    if (database) {
      const sqlStatement = `
        SELECT *
        FROM features
        WHERE states LIKE '%Colorado%'
        AND name = '${name}';
      `;
      executeSql!(database, sqlStatement, [])
        .then((resultSet: any) => {
          const feature = processFeature(resultSet);
          setFeature(feature);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [name]);

  // font hooks
  useFonts({
    NotoSansJP_700Bold,
    NunitoSans_400Regular,
  });

  return (
    <View style={styles.container}>
      <View pointerEvents={"none"} style={styles.mapContainer}>
        {coordinate && region && (
          <MapView
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
        <Text style={styles.name}>{properties?.name}</Text>
        <Text style={styles.hierarchy}>
          {properties?.regions.length
            ? `${properties?.regions.split(",")[0]}, `
            : null}
          {properties?.states.length
            ? `${properties?.states.split(",")[0]}`
            : null}
        </Text>
        <Text style={styles.hierarchy}>
          {properties?.countries.length
            ? `${properties?.countries.split(",")[0]}, `
            : null}
          {properties?.continent ? properties?.continent : null}
        </Text>
        <Text style={styles.elevation}>
          {`${properties?.feet.toLocaleString()} ft / ${properties?.meters.toLocaleString()} m`}
        </Text>
        <Text style={styles.coordinate}>
          {`${coordinate?.latitude}° ${
            coordinate?.latitude >= 0 ? "N" : "S"
          }, ${coordinate?.longitude}° ${
            coordinate?.longitude >= 0 ? "E" : "W"
          }`}
        </Text>
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
