import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { colors } from "../../../common/styles";
import HomeTabs from "../HomeTabs";
import MapDrawer from "../MapDrawer";
import ProfileStack from "../ProfileStack";
import ExploreStack from "../ExploreStack";
import { MainTabsParamList } from "./types";

const MainTabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => (
  <View
    style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}
  >
    {state.routes.map((route: any, index: number) => {
      // destructure route options
      const { options } = descriptors[route.key];

      // determine current route
      const isFocused = state.index === index;

      // get route icon
      const icon = options.tabBarIcon!({
        focused: isFocused,
        color: colors.queenBlue,
        size: 24,
      });

      const onPress = () => {
        // define custom event
        const event = navigation.emit({
          canPreventDefault: true,
          type: "tabPress",
          target: route.key,
        });

        // reroute if eligible
        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      return (
        <TouchableOpacity
          key={route.key}
          onPress={onPress}
          style={styles.button}
        >
          {icon}
        </TouchableOpacity>
      );
    })}
  </View>
);

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
          } else if (route.name === "Explore") {
            iconName = focused ? "ios-flag" : "ios-flag-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBar={(props) => <MainTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeTabs} />
      <Tab.Screen name="Map" component={MapDrawer} />
      <Tab.Screen name="Explore" component={ExploreStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainTabs;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    paddingVertical: 16,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopColor: colors.queenBlue50,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
