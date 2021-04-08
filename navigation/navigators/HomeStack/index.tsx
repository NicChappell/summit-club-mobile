import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigatorHeader } from "../../../common/navigation";
import { HomeScreen, SearchResultsScreen } from "../../../screens";
import { HomeStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Home"
      screenOptions={{ header: StackNavigatorHeader }}
    >
      <Stack.Screen
        component={HomeScreen}
        name="Home"
        options={{
          title: "Summit Club",
        }}
      />
      <Stack.Screen
        component={SearchResultsScreen}
        name="SearchResults"
        options={{
          title: "Search Results",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
