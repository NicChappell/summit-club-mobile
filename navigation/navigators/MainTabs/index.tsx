import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabBar } from "../../../common/navigation";
import { DownloadScreen } from "../../../screens";
import ExploreDrawer from "../ExploreDrawer";
import HomeTabs from "../HomeTabs";
import MapDrawer from "../MapDrawer";
import ProfileStack from "../ProfileStack";
import { MainTabsParamList } from "./types";

// new bottom tab navigator
const Tab = createBottomTabNavigator<MainTabsParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "ios-compass" : "ios-compass-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "ios-flag" : "ios-flag-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "Download") {
            iconName = focused ? "ios-download" : "ios-download-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBar={(props) => <MainTabBar {...props} />}
    >
      <Tab.Screen component={HomeTabs} name="Home" />
      <Tab.Screen component={MapDrawer} name="Map" />
      <Tab.Screen component={ExploreDrawer} name="Explore" />
      <Tab.Screen component={ProfileStack} name="Profile" />
      <Tab.Screen component={DownloadScreen} name="Download" />
    </Tab.Navigator>
  );
};

export default MainTabs;
