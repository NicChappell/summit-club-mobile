import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "../../../common/styles";

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

export default MainTabBar;

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
