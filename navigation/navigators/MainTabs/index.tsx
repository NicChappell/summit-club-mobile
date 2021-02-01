import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SummitsScreen } from "../../../screens";
import { colors } from "../../../common/styles";
import SettingsStack from "../SettingsStack";
import MapStack from "../MapStack";
import HomeTabs from "../HomeTabs";
import { IMainTabBar } from "./interfaces";
import { MainTabsParamList } from "./types";

const MainTabBar = ({ descriptors, navigation, state }: IMainTabBar) => (
  <View style={styles.container}>
    {state.routes.map((route: any, index: number) => {
      // destructure route options
      const { options } = descriptors[route.key];

      // determine current route
      const isFocused = state.index === index;

      // get route icon
      const icon = options.tabBarIcon({
        focused: isFocused,
        color: isFocused ? colors.zomp : colors.queenBlue,
        size: 24,
      });

      const onPress = () => {
        // define custom event
        const event = navigation.emit({
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
          } else if (route.name === "Summits") {
            iconName = focused ? "ios-flag" : "ios-flag-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBar={(props) => <MainTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeTabs} />
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Summits" component={SummitsScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
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
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopColor: colors.queenBlue,
    borderTopWidth: 1,
    display: "flex",
    height: 64,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
