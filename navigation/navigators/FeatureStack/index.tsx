import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigatorHeader } from "../../../common/navigation";
import { FeatureScreen, CheckInScreen } from "../../../screens";
import { FeatureStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<FeatureStackParamList>();

const FeatureStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Feature"
      screenOptions={{ header: StackNavigatorHeader }}
    >
      <Stack.Screen
        component={CheckInScreen}
        name="CheckIn"
        options={{
          title: "Check In",
        }}
      />
      <Stack.Screen
        component={FeatureScreen}
        name="Feature"
        options={{
          title: "Summit Club",
        }}
      />
    </Stack.Navigator>
  );
};

export default FeatureStack;
