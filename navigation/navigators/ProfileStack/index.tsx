import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigatorHeader } from "../../../common/navigation";
import {
  AccountScreen,
  ContactScreen,
  ProfileScreen,
  SettingsScreen,
  SummitsScreen,
} from "../../../screens";
import { ProfileStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Profile"
      screenOptions={{ header: StackNavigatorHeader }}
    >
      <Stack.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        component={SummitsScreen}
        name="Summits"
        options={{
          title: "My Summits",
        }}
      />
      <Stack.Screen
        component={ContactScreen}
        name="Contact"
        options={{
          title: "Contact",
        }}
      />
      <Stack.Screen
        component={AccountScreen}
        name="Account"
        options={{
          title: "Account",
        }}
      />
      <Stack.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          title: "Settings",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
