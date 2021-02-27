import React, { useState } from "react";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createStackNavigator,
  StackHeaderLeftButtonProps,
  StackHeaderProps,
} from "@react-navigation/stack";
import { colors } from "../../../common/styles";
import { MapContext } from "../../../contexts";
import { FeatureScreen, MapScreen } from "../../../screens";
import { executeSql } from "./helpers";
import { MapStackParamList } from "./types";

const MapStackHeader = ({ navigation, previous, scene }: StackHeaderProps) => {
  // destructure scene
  const {
    descriptor: { options },
  } = scene;

  let handlePress;
  let iconName;

  if (previous) {
    handlePress = navigation.goBack;
    iconName = "ios-chevron-back";
  } else {
    handlePress = () => console.log("TODO: USE TO OPEN DRAWER");
    iconName = "ios-options";
  }

  return (
    <View style={[styles.container, { paddingTop: useSafeAreaInsets().top }]}>
      <TouchableOpacity style={styles.left} onPress={handlePress}>
        <Ionicons name={iconName} size={28} color={colors.queenBlue} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.center}>
        {options.title}
      </Text>
      <View style={styles.right}>{/* intentionally empty */}</View>
    </View>
  );
};

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
    executeSql,
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
        screenOptions={{ header: MapStackHeader }}
      >
        <Stack.Screen
          component={MapScreen}
          name="Map"
          options={{
            title: "[STATE_NAME]",
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

const styles = StyleSheet.create({
  center: {
    color: colors.queenBlue,
    flex: 0,
    fontFamily: "NotoSansJP_500Medium",
    maxWidth: 240,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomColor: colors.queenBlue50,
    borderBottomWidth: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 64,
    justifyContent: "space-between",
  },
  left: {
    alignItems: "flex-start",
    flex: 1,
    justifyContent: "center",
    paddingLeft: 12,
  },
  right: {
    flex: 1,
    paddingRight: 12,
  },
});
