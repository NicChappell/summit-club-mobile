import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  colors,
  navigationHeaderButton,
  navigationHeaderRightComponent,
} from "../../../../styles";
import { IRightComponent } from "./types";

const RightComponent = ({ navigation, route }: IRightComponent) => {
  // destructure route
  const { name } = route;

  // return custom tab navigation control for select screens
  if (name === "Explore") {
    return (
      <View style={navigationHeaderRightComponent}>
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
      </View>
    );
  } else if (name === "Map") {
    return (
      <View style={navigationHeaderRightComponent}>
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
      </View>
    );
  } else {
    // return empty view by default
    return (
      <View style={navigationHeaderRightComponent}>
        {/* intentionally empty */}
      </View>
    );
  }
};

export default RightComponent;

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
