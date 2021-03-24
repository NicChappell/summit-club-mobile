import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigatorHeader } from "../../../common/navigation";
import { FeatureScreen, MapScreen } from "../../../screens";
import { MapStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  return (
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
  );
};

export default MapStack;
