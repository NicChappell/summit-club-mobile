import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { FeatureCollection, Point } from "geojson";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../../actions";
import { ErrorOverlay } from "../../common/components";
import { colors } from "../../common/styles";
import { LatLng, Region } from "../../common/types";
import { MapContext } from "../../contexts";
import { RootState } from "../../reducers";
import { CalloutView, MarkerView } from "./components";
import { processFeatureCollection } from "./helpers";
import { IMapScreen } from "./interfaces";

const initRegion: Region = {
  latitude: 39.113014,
  longitude: -105.358887,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

type Props = PropsFromRedux & IMapScreen;

const MapScreen = ({ error, navigation, route, setError }: Props) => {
  // context hooks
  const {
    database,
    feature,
    features,
    featuresRef,
    setFeature,
    setFeatures,
  } = useContext(MapContext);

  // state hooks
  const [featureCollection, setFeatureCollection] = useState<
    FeatureCollection | undefined
  >(undefined);
  console.log(featureCollection);

  // effect hooks
  useEffect(() => {
    if (database && featuresRef) {
      queryFeaturesTable(database, featuresRef);
    }
  }, [database, featuresRef]);

  // asynchronous sqlite transaction wrapper function
  const executeSql = async (
    database: SQLite.WebSQLDatabase,
    sqlStatement: string,
    args: string[] = []
  ) => {
    return new Promise((resolve, reject) => {
      // new database transaction
      database.transaction(
        (tx) => {
          // execute sql statement
          tx.executeSql(
            // sql statement
            sqlStatement,
            // arguments
            [...args],
            // success callback
            (_tx: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
              resolve(resultSet);
            },
            // error callback
            (_tx: SQLite.SQLTransaction, error: SQLite.SQLError) => {
              reject(error);

              // typescript expects a return boolean
              return true;
            }
          );
        },
        // error callback
        (_error: SQLite.SQLError) => {},
        // success callback
        () => {}
      );
    });
  };

  const createFeaturesTable = async (
    database: SQLite.WebSQLDatabase,
    featuresRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => {
    try {
      const sqlStatement = `
        CREATE TABLE IF NOT EXISTS features (
          continent TEXT,
          countries TEXT,
          feet INTEGER,
          latitude REAL,
          longitude REAL,
          marker_size TEXT,
          marker_symbol TEXT,
          meters INTEGER,
          name TEXT,
          regions TEXT,
          states TEXT
        );
      `;
      await executeSql(database, sqlStatement, []);

      populateFeaturesTable(database, featuresRef);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const dropFeaturesTable = async (database: SQLite.WebSQLDatabase) => {
    try {
      await executeSql(database, `DROP TABLE IF EXISTS features;`, []);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const populateFeaturesTable = async (
    database: SQLite.WebSQLDatabase,
    featuresRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => {
    try {
      // retrieve data from firestore
      const snapshot = await featuresRef
        // .where("properties.states", "array-contains-any", ["Colorado"])
        .get();

      // collect firestore documents
      const documents: firebase.firestore.DocumentData[] = [];
      snapshot.forEach((doc) => {
        // retrieve all document fields as an object
        // NOTE: data object is equivalent to a GeoJSON Feature object
        const document = doc.data();

        // push document into documents array
        documents.push(document);
      });

      // wait for all database transactions to finish
      const sqlStatement = `
        INSERT INTO features (
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
          ?,?,?,?,?,?,?,?,?,?,?
        );
      `;
      for (const document of documents) {
        // destructure properties from document
        const { properties } = document;

        // format arguments
        const args = [
          properties.continent,
          properties.countries ? properties.countries.toString() : null,
          properties.feet,
          properties.latitude,
          properties.longitude,
          properties["marker-size"],
          properties["marker-symbol"],
          properties.meters,
          properties.name,
          properties.regions ? properties.regions.toString() : null,
          properties.states ? properties.states.toString() : null,
        ];

        await executeSql(database, sqlStatement, args);
      }

      // re-query features table
      queryFeaturesTable(database, featuresRef);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const queryFeaturesTable = async (
    database: SQLite.WebSQLDatabase,
    featuresRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => {
    try {
      const sqlStatement = `
        SELECT *
        FROM features
        WHERE states LIKE '%Colorado%'
        ORDER BY meters DESC
        LIMIT 100;
      `;
      const resultSet: any = await executeSql(database, sqlStatement, []);
      console.log(resultSet.rows._array.length);

      // convert resultSet into GeoJSON FeatureCollection
      const featureCollection = processFeatureCollection(resultSet);

      // update state
      setFeatureCollection(featureCollection);

      // // update state eventually, but keep dropping while developing
      // dropFeaturesTable(database);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });

      // (re-)create features table if query error
      createFeaturesTable(database, featuresRef);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ErrorOverlay error={error} />
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
