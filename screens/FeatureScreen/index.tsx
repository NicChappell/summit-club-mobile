import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { Point } from "geojson";
import { colors } from "../../common/styles";
import { LatLng, Region } from "../../common/types";
import { MapContext } from "../../contexts";
import { MarkerView } from "./components";
import { processFeature } from "./helpers";
import { IFeatureScreen } from "./interfaces";

const FeatureScreen = ({ navigation, route }: IFeatureScreen) => {
  // destructure route params
  const { slug } = route.params;

  // context hooks
  const { database, feature, setFeature } = useContext(MapContext);

  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng | undefined>(undefined);
  const [region, setRegion] = useState<Region | undefined>(undefined);

  // ref hooks
  const mapRef: React.MutableRefObject<MapView | null> = useRef(null);

  // effect hooks
  useEffect(() => {
    if (feature) {
      // destructure feature
      const geometry = feature.geometry;

      // destructure geometry
      const coordinates = (geometry as Point).coordinates;

      // format marker coordinate
      const coordinate: LatLng = {
        latitude: coordinates[1],
        longitude: coordinates[0],
      };

      const region: Region = {
        latitude: coordinates[1],
        longitude: coordinates[0],
        latitudeDelta: 0.075,
        longitudeDelta: 0.075,
      };

      // update state
      setCoordinate(coordinate);
      setRegion(region);
    }
  }, [feature]);

  useEffect(() => {
    if (database) {
      // new database transaction
      database.transaction((tx) => {
        // execute sql statement
        tx.executeSql(
          `SELECT * FROM fourteeners WHERE slug = '${slug}';`,
          [],
          (_: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
            // convert ResultSet into GeoJSON Feature
            const feature = processFeature(ResultSet);

            // update context
            setFeature(feature);
          }
        );
      });
    }
  }, [slug]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {coordinate && region && (
          <MapView
            provider={"google"}
            ref={mapRef}
            region={region}
            style={styles.map}
          >
            <Marker coordinate={coordinate}>
              <MarkerView />
            </Marker>
          </MapView>
        )}
      </View>
      <Text>This is top text.</Text>
      <Text>FeatureScreen</Text>
      <Text>{slug}</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

export default FeatureScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.pistachio,
    flex: 1,
    justifyContent: "flex-start",
  },
  mapContainer: {
    backgroundColor: colors.orangeRed,
    width: "100%",
    height: "50%",
  },
  map: {
    flex: 1,
  },
});
