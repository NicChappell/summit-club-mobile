import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";
import {
  colors,
  navigationHeaderButton,
  navigationHeaderLeftComponent,
} from "../../../../styles";
import { ILeftComponent } from "./types";

const LeftComponent = ({ navigation, route }: ILeftComponent) => {
  // destructure route
  const { name } = route;

  // return drawer navigation control for select screens
  if (name === "Explore" || name === "Map") {
    return (
      <View style={navigationHeaderLeftComponent}>
        <TouchableOpacity
          style={navigationHeaderButton}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name={"ios-options"} size={28} color={colors.queenBlue} />
        </TouchableOpacity>
      </View>
    );
  }

  // return empty view by default
  return (
    <View style={navigationHeaderLeftComponent}>
      {/* intentionally empty */}
    </View>
  );
};

export default LeftComponent;
