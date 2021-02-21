import React, { useContext, useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Point } from "geojson";
import * as actions from "../../redux/actions";
import { ErrorOverlay } from "../../common/components";
import { LatLng, Region } from "../../common/types";
import { MapContext } from "../../contexts";
import { RootState } from "../../redux/reducers";
import { CalloutView, MarkerView } from "./components";
import { processResultSet } from "./helpers";
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
    executeSql,
    feature,
    features,
    featuresRef,
    setFeature,
    setFeatures,
  } = useContext(MapContext);

  // effect hooks
  useEffect(() => {
    if (database && featuresRef) {
      queryFeaturesTable(database, featuresRef);
    }
  }, []);

  // // effect hooks
  // useEffect(() => {
  //   if (database) {
  //     dropFeaturesTable(database);
  //   }
  // }, []);

  const createFeaturesTable = async (
    database: SQLite.WebSQLDatabase,
    featuresRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  ) => {
    try {
      const sqlStatement = `
        CREATE TABLE IF NOT EXISTS features (
          class TEXT,
          continent TEXT,
          country TEXT,
          county TEXT,
          feet INTEGER,
          latitude REAL,
          longitude REAL,
          meters INTEGER,
          name TEXT,
          state TEXT
        );
      `;
      await executeSql!(database, sqlStatement, []);

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
      await executeSql!(database, `DROP TABLE IF EXISTS features;`, []);
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
        .where("properties.class", "==", "Summit")
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
          class,
          continent,
          country,
          county,
          feet,
          latitude,
          longitude,
          meters,
          name,
          state
        ) VALUES (
          ?,?,?,?,?,?,?,?,?,?
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
          properties.latitude,
          properties.longitude,
          properties.meters,
          properties.name,
          properties.state,
        ];

        await executeSql!(database, sqlStatement, args);
      }

      // query features table
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
        ORDER BY meters DESC
        LIMIT 500;
      `;
      const resultSet: any = await executeSql!(database, sqlStatement, []);
      console.log("resultSet.rows._array.length", resultSet.rows._array.length);

      // convert resultSet into GeoJSON FeatureCollection
      const { features } = processResultSet(resultSet);
      console.log("features.length", features.length);

      // update state
      setFeatures(features);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });

      // drop and create features table if query error
      dropFeaturesTable(database);
      createFeaturesTable(database, featuresRef);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ErrorOverlay error={error} />
      <MapView
        loadingEnabled={true}
        pitchEnabled={false}
        provider={"google"}
        region={initRegion}
        style={styles.map}
      >
        {features?.map((feature, index) => {
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
          console.log(index);

          return (
            <Marker
              key={index}
              coordinate={coordinate}
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
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
