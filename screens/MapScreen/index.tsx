import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { FeatureCollection, Point } from "geojson";
import { colors } from "../../common/styles";
import { LatLng, Region } from "../../common/types";
import { MapContext } from "../../contexts";
import { CalloutView, MarkerView } from "./components";
// import { processFeatureCollection } from "./helpers";
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

  // open (or create) features database
  const db = SQLite.openDatabase("features");

  const populateFeaturesTable = () => {
    // first need to query firestore and get results
    const firestore = firebase.firestore();

    const featuresRef = firestore.collection("features");

    featuresRef
      .where("properties.states", "array-contains-any", ["Colorado"])
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs.length);

        // then need to create new array formatted for use in sql instert statement
        snapshot.forEach((doc) => {
          const { properties } = doc.data();

          const continent = properties.continent;
          const countries = properties.countries.toString();
          const feet = properties.feet;
          const latitude = properties.latitude;
          const longitude = properties.longitude;
          const marker_size = properties["marker-size"];
          const marker_symbol = properties["marker-symbol"];
          const meters = properties.meters;
          const name = properties.name;
          const regions = properties.regions
            ? properties.regions.toString()
            : null;
          const states = properties.states
            ? properties.states.toString()
            : null;

          const array = [
            continent,
            countries,
            feet,
            latitude,
            longitude,
            marker_size,
            marker_symbol,
            meters,
            name,
            regions,
            states,
          ];

          console.log(array);

          // then need to create a new db transaction for each reacord

          // new database transaction
          db.transaction((tx) => {
            // execute sql statement
            tx.executeSql(
              // sql query
              `INSERT INTO features (
                continent,
                countries,
                feet,
                latitude,
                longitude,
                marker_size,
                marker_symbol,
                meters,
                name,
                regions,
                states
              ) VALUES (
                "${continent}",
                "${countries}",
                ${feet},
                ${latitude},
                ${longitude},
                "${marker_size}",
                "${marker_symbol}",
                ${meters},
                "${name}",
                "${regions}",
                "${states}"
              );`,
              // substitution variables
              [],
              // success callback
              (_tx: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
                console.log("Document successfully written!");
              },
              // error callback
              (_tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                console.error("Error writing document: ", error.message);
                return true;
              }
            );
          });
        });
      });
  };

  const dropFeaturesTable = () => {
    // new database transaction
    db.transaction((tx) => {
      // execute sql statement
      tx.executeSql(
        // sql query
        `DROP TABLE IF EXISTS features;`,
        // substitution variables
        [],
        // success callback
        (_tx: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
          console.log(ResultSet);
        },
        // error callback
        (_tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          console.log(error.code);
          console.log(error.message);
          return true;
        }
      );
    });
  };

  const createFeaturesTable = () => {
    // new database transaction
    db.transaction((tx) => {
      // execute sql statement
      tx.executeSql(
        // sql query
        `CREATE TABLE IF NOT EXISTS features (
          continent TEXT NOT NULL,
          countries TEXT NOT NULL,
          feet INTEGER NOT NULL,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL,
          marker_size TEXT NOT NULL,
          marker_symbol TEXT NOT NULL,
          meters INTEGER NOT NULL,
          name TEXT NOT NULL,
          regions TEXT,
          states TEXT
        );`,
        // substitution variables
        [],
        // success callback
        (_tx: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
          console.log(ResultSet);
          populateFeaturesTable();
        },
        // error callback
        (_tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          console.log(error.code);
          console.log(error.message);
          return true;
        }
      );
    });
  };

  // effect hooks
  useEffect(() => {
    // new database transaction
    db.transaction((tx) => {
      // execute sql statement
      tx.executeSql(
        // sql query
        `SELECT * FROM features;`,
        // substitution variables
        [],
        // success callback
        (_tx: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
          console.log(ResultSet.rows._array.length);
          // dropFeaturesTable();
        },
        // error callback
        (_tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
          console.log(error.code);
          console.log(error.message);
          createFeaturesTable();
          return true;
        }
      );
    });
  }, []);

  // useEffect(() => {
  //   // COULD SET THIS REF IN STATE?
  //   // OR DO I HAVE TO DO THIS IN ANY
  //   // FILE I NEED TO QUERY THE DB?
  //   const db = firebase.firestore();

  //   const featuresRef = db.collection("features");

  //   featuresRef
  //     .where("properties.states", "array-contains-any", ["Colorado"])
  //     .get()
  //     .then((snapshot) => {
  //       // console.log(snapshot.docs.length);
  //       // snapshot.forEach((doc) => {
  //       //   console.log(doc.id, "=>", doc.data());
  //       // });

  //       // open (or create) features database
  //       const database = SQLite.openDatabase("features");
  //       // console.log(database);

  //       // new database transaction
  //       database.transaction((tx) => {
  //         // execute sql statement
  //         tx.executeSql(
  //           // sql query
  //           `SELECT * FROM features;`,
  //           // substitution variables
  //           [],
  //           // success callback
  //           (_tx: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
  //             console.log(ResultSet.rows._array.length);
  //           },
  //           // error callback
  //           (_tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
  //             console.log(error.code);
  //             console.log(error.message);
  //             return true;
  //           }
  //         );
  //       });
  //     });
  // }, []);

  // useEffect(() => {
  //   if (database) {
  //     // new database transaction
  //     database.transaction((tx) => {
  //       // execute sql statement
  //       tx.executeSql(
  //         `SELECT * FROM fourteeners;`,
  //         [],
  //         (_: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
  //           console.log(ResultSet.rows._array.length);
  //         }
  //       );
  //     });
  //   }
  // }, [database]);

  // useEffect(() => {
  //   openDatabase()
  //     .then((database) => {
  //       setDatabase(database);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (database) {
  //     // new database transaction
  //     database.transaction((tx) => {
  //       // execute sql statement
  //       tx.executeSql(
  //         `SELECT * FROM fourteeners;`,
  //         [],
  //         (_: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
  //           // convert ResultSet into GeoJSON FeatureCollection
  //           const featureCollection = processFeatureCollection(ResultSet);

  //           // update state
  //           setFeatureCollection(featureCollection);
  //         }
  //       );
  //     });
  //   }
  // }, [database]);

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
