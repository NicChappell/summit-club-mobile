import * as React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SummitsScreen } from "../../../screens";
import COLORS from "../../../common/styles/colors";
import SettingsStack from "../SettingsStack";
import MapStack from "../MapStack";
import HomeTabs from "../HomeTabs";
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
            iconName = focused ? "ios-map" : "ios-map-outline";
          } else if (route.name === "Summits") {
            iconName = focused ? "ios-flag" : "ios-flag-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.zomp,
        inactiveTintColor: COLORS.queenBlue,
      }}
    >
      <Tab.Screen name="Home" component={HomeTabs} />
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Summits" component={SummitsScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

export default MainTabs;
