import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
import { colors } from "../../../../styles";
import { IStackNavigatorControl } from "./interfaces";

const LeftStackNavigatorControl = ({
  navigation,
  previousScreen,
  name,
}: IStackNavigatorControl) => {
  // if previous screen return default navigation control
  if (previousScreen) {
    return (
      <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
        <Ionicons
          name={"ios-chevron-back"}
          size={28}
          color={colors.queenBlue}
        />
      </TouchableOpacity>
    );
  }

  // return custom navigation control for select screens
  switch (name) {
    case "Explore":
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name={"ios-filter-outline"} size={28} color={colors.queenBlue} />
        </TouchableOpacity>
      );
    case "Map":
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name={"ios-options"} size={28} color={colors.queenBlue} />
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

export default LeftStackNavigatorControl;

const styles = StyleSheet.create({
  button: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
