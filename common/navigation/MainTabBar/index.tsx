import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "../../../common/styles";

const MainTabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => (
  <View
    style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}
  >
    {state.routes.map((route: any, index: number) => {
      // destructure options from descriptors
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
          <Text style={styles.title}>{options.title}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default MainTabBar;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    height: 80,
    justifyContent: "center",
    width: 64,
  },
  container: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderTopColor: colors.queenBlue50,
    borderTopWidth: 1,
    flexBasis: "auto",
    flexDirection: "row",
    flexGrow: 0,
    flexShrink: 1,
    justifyContent: "space-evenly",
  },
  title: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 12,
    lineHeight: 16,
  },
});
