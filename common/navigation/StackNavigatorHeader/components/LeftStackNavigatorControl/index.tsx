import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
import { colors, navigationHeaderButton } from "../../../../styles";
import { IStackNavigatorControl } from "./types";

const LeftStackNavigatorControl = ({
  navigation,
  previousScreen,
  name,
}: IStackNavigatorControl) => {
  // return drawer navigation control for select screens
  if (name === "Explore" || name === "Map") {
    return (
      <TouchableOpacity
        style={navigationHeaderButton}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name={"ios-options"} size={28} color={colors.queenBlue} />
      </TouchableOpacity>
    );
  }

  // return back navigation control for nested screens
  if (previousScreen) {
    return (
      <TouchableOpacity
        style={navigationHeaderButton}
        onPress={navigation.goBack}
      >
        <Ionicons
          name={"ios-chevron-back"}
          size={28}
          color={colors.queenBlue}
        />
      </TouchableOpacity>
    );
  }

  // return null by default
  return null;
};

export default LeftStackNavigatorControl;
