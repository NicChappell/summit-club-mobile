import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigatorHeader } from "../../../common/navigation";
import { FeatureScreen, ExploreScreen } from "../../../screens";
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
        component={FeatureScreen}
        name="Feature"
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default SummitsStack;
