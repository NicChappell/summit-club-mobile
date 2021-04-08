import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExploreScreen, MapScreen } from "../../../screens";
import { ExploreTabsParamList } from "./types";

// new bottom tab navigator
const Tab = createBottomTabNavigator<ExploreTabsParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarVisible: false }}>
      <Tab.Screen
        component={MapScreen}
        name="Map"
        options={{
          title: "Explore Summits",
        }}
      />
      <Tab.Screen
        component={ExploreScreen}
        name="Explore"
        options={{
          title: "Explore Summits",
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
