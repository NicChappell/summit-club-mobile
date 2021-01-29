import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FeatureScreen, MapScreen } from "../../../screens";
import { MapStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<MapStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="Feature" component={FeatureScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
