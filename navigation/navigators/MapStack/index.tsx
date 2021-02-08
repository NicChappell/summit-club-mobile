import React, { useState } from "react";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { createStackNavigator } from "@react-navigation/stack";
import { ISQLResult } from "../../../common/interfaces";
import { MapContext } from "../../../contexts";
import { FeatureScreen, MapScreen } from "../../../screens";
import { MapStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  // state hooks
  const [feature, setFeature] = useState<ISQLResult | undefined>(undefined);
  const [features, setFeatures] = useState<ISQLResult[] | undefined>(undefined);

  const database = SQLite.openDatabase("features");
  const featuresRef = firebase.firestore().collection("features");

  // context provider value
  const value = {
    database,
    feature,
    features,
    featuresRef,
    setFeature,
    setFeatures,
  };

  return (
    <MapContext.Provider value={value}>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Feature" component={FeatureScreen} />
      </Stack.Navigator>
    </MapContext.Provider>
  );
};

export default MapStack;
