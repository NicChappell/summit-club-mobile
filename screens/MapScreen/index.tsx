import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { FeatureCollection, Point } from "geojson";
import { colors } from "../../common/styles";
import { LatLng, Region } from "../../common/types";
import { MapContext } from "../../contexts";
import { CalloutView, MarkerView } from "./components";
import { processFeatureCollection } from "./helpers";
import { IMapScreen } from "./interfaces";

const initRegion: Region = {
  latitude: 39.113014,
  longitude: -105.358887,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

const MapScreen = ({ navigation, route }: IMapScreen) => {
  // context hooks
  const { database, openDatabase, setDatabase } = useContext(MapContext);

  // state hooks
  const [featureCollection, setFeatureCollection] = useState<
    FeatureCollection | undefined
  >(undefined);

  // effect hooks
  useEffect(() => {
    openDatabase()
      .then((database) => {
        setDatabase(database);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (database) {
      // new database transaction
      database.transaction((tx) => {
        // execute sql statement
        tx.executeSql(
          `SELECT * FROM fourteeners;`,
          [],
          (_: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
            // convert ResultSet into GeoJSON FeatureCollection
            const featureCollection = processFeatureCollection(ResultSet);

            // update state
            setFeatureCollection(featureCollection);
          }
        );
      });
    }
  }, [database]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView provider={"google"} region={initRegion} style={styles.map}>
        {featureCollection?.features.map((feature, index) => {
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
            <Marker key={index} coordinate={coordinate}>
              <MarkerView />
              <Callout
                onPress={() =>
                  navigation.navigate("Feature", { slug: properties?.slug })
                }
              >
                <CalloutView properties={properties} />
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
