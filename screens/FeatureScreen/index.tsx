import React, { useContext, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { MapContext } from "../../contexts";
import { processFeature } from "./helpers";
import { IFeatureScreen } from "./interfaces";

const FeatureScreen = ({ navigation, route }: IFeatureScreen) => {
  // destructure route params
  const { slug } = route.params;

  // context hooks
  const { database, feature, setFeature } = useContext(MapContext);
  console.log(feature);

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

            // update state
            setFeature(feature);
          }
        );
      });
    }
    console.log(slug);
  }, [slug]);

  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
});
