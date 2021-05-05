import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, navigationHeaderButton } from "../../../../styles";
import { IStackNavigatorControl } from "./types";

const RightStackNavigatorControl = ({
  navigation,
  name,
}: IStackNavigatorControl) => {
  // return custom navigation control for select screens
  switch (name) {
    case "Explore":
      return (
        <TouchableOpacity
          style={navigationHeaderButton}
          onPress={() => navigation.navigate("Map")}
        >
          <Ionicons
            name={"ios-map-outline"}
            size={28}
            color={colors.queenBlue}
          />
        </TouchableOpacity>
      );
    case "Map":
      return (
        <TouchableOpacity
          style={navigationHeaderButton}
          onPress={() => navigation.navigate("Explore")}
        >
          <Ionicons
            name={"ios-list-outline"}
            size={28}
            color={colors.queenBlue}
          />
        </TouchableOpacity>
      );
    default:
      return null;
  }
};

export default RightStackNavigatorControl;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  title: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 16,
  },
});
