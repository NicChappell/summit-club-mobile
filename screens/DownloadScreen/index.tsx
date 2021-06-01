import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import firebase from "firebase/app";
import { TabNavigationHeader } from "../../common/navigation";
import { ErrorOverlay } from "../../common/components";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { executeSql, featuresCollectionRef, Summit, defaultBounds } from "../../services";
import { IDownloadScreen } from "./types";

import * as Location from "expo-location";

type Props = PropsFromRedux & IDownloadScreen;

const DownloadScreen = ({ error, navigation, route, setError }: Props) => {
  const countRows = async () => {
    try {
      const resultSet = await executeSql(`SELECT COUNT(*) FROM feature;`, []);

      // destructure result set
      const { _array }: any = resultSet.rows;

      // get count from ResultSet array
      const count = _array[0]["COUNT(*)"];

      return count;
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const createTable = async () => {
    // start loading animation
    // TODO: START LOADING ANIMATION

    try {
      const sqlStatement = `
        CREATE TABLE IF NOT EXISTS feature (
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

      const mrah = await executeSql(sqlStatement);
      console.log(mrah);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }

    // stop loading animation
    // TODO: STOP LOADING ANIMATION
  };

  const dropTable = async () => {
    // start loading animation
    // TODO: START LOADING ANIMATION

    try {
      const mrah = await executeSql(`DROP TABLE IF EXISTS feature;`);
      console.log(mrah);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }

    // stop loading animation
    // TODO: STOP LOADING ANIMATION
  };

  const populateFeatureTable = async () => {
    // start loading animation
    // TODO: START LOADING ANIMATION

    try {
      // TODO: FIRST NEED TO QUERY TABLE TO MAKE SURE I DON'T WRITE DUPLICATE DATA
      // return early if table data already exists
      const count = await countRows();
      if (count) {
        console.log(count);
        return;
      }

      // retrieve data from firestore
      const snapshot = await featuresCollectionRef.where(
        "properties.class",
        "==",
        "Summit"
      ).get();

      // collect firestore documents
      const documents: firebase.firestore.DocumentData[] = [];
      snapshot.forEach((doc) => {
        // retrieve all document fields as an object
        // NOTE: each document is equivalent to a Feature object
        const document = doc.data();

        // add document id to feature properties
        document.properties.id = doc.id;

        // push document into documents array
        documents.push(document);
      });

      // wait for all database transactions to finish
      const sqlStatement = `
        INSERT INTO feature (
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

        await executeSql(sqlStatement, args);
      }
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }

    // stop loading animation
    // TODO: STOP LOADING ANIMATION
  };

  const testQueryHandler = async () => {
    // start loading animation
    // TODO: START LOADING ANIMATION

    try {
      // retrieve data from firestore
      const summits = await Summit.query({
        bounds: defaultBounds,
        filters: "",
        orderBy: "DESC",
        limit: 64,
        offset: 0,
      });

      console.log(summits);
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }

    // stop loading animation
    // TODO: STOP LOADING ANIMATION
  };

  const getLocation = async () => {
    // need some mechanism to check for location permission first
    // at app load, check for user permissions
    // whatever the permission status is, store in REDUX
    // first thing is to check Redux for permission
    // if granted, get location
    // if not granted, add flow to re-request user permission
    // might need something stored locally using async storage to check if already asked once
    // if haven't asked can ask for first time
    // if already asked, instructions to go into settings and update manually

    try {
      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <TabNavigationHeader navigation={navigation} route={route} />
      <Text>This is top text.</Text>
      <View>
        <Text>DownloadScreen</Text>
        <Text>
          This is where I will have options to download content for offline
          experience
        </Text>
        <Button onPress={createTable} title="Create feature table" />
        <Button onPress={dropTable} title="Drop feature table" />
        <Button onPress={populateFeatureTable} title="Populate feature table" />
        <Button onPress={countRows} title="Count feature rows" />
        <Button onPress={testQueryHandler} title="Test query" />
        <Button onPress={getLocation} title="Get location" />
        <Text>
          I'll still have some content download automatically, but this is where
          you can choose to download more sets of map tiles beyond the default
        </Text>
      </View>
      <Text>This is bottom text.</Text>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  setError: actions.setError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DownloadScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});
