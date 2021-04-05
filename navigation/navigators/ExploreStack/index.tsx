import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigatorHeader } from "../../../common/navigation";
import { ExploreScreen } from "../../../screens";
import FeatureStack from "../FeatureStack";
import { SummitsStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<SummitsStackParamList>();

const SummitsStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Explore"
      screenOptions={{ header: StackNavigatorHeader }}
    >
      <Stack.Screen
        component={ExploreScreen}
        name="Explore"
        options={{
          title: "Explore Summits",
        }}
      />
      <Stack.Screen
        component={FeatureStack}
        name="Feature"
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SummitsStack;
