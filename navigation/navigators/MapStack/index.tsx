import React, { useState } from "react";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { createStackNavigator } from "@react-navigation/stack";
import { MapContext } from "../../../contexts";
import { StackNavigatorHeader } from "../../../common/components";
import { FeatureScreen, MapScreen } from "../../../screens";
import { MapStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  // state hooks
  const [feature, setFeature] = useState<
    Feature<Geometry, GeoJsonProperties> | undefined
  >(undefined);
  const [features, setFeatures] = useState<
    Feature<Geometry, GeoJsonProperties>[] | undefined
  >(undefined);

  const featuresDatabase = SQLite.openDatabase("features");
  const featuresCollectionRef = firebase.firestore().collection("features");

  // context provider value
  const value = {
    featuresDatabase,
    feature,
    features,
    featuresCollectionRef,
    setFeature,
    setFeatures,
  };

  return (
    <MapContext.Provider value={value}>
      <Stack.Navigator
        headerMode="screen"
        initialRouteName="Map"
        screenOptions={{ header: StackNavigatorHeader }}
      >
        <Stack.Screen
          component={MapScreen}
          name="Map"
          options={{
            title: "Search Summits",
          }}
        />
        <Stack.Screen
          component={FeatureScreen}
          name="Feature"
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </MapContext.Provider>
  );
};

export default MapStack;
