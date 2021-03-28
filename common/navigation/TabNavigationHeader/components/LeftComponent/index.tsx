import React from "react";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  colors,
  navigationHeaderButton,
  navigationHeaderLeftComponent,
} from "../../../../styles";
import { ILeftComponent } from "./interfaces";

const LeftComponent = ({
  name,
  navigation,
  previousScreen,
}: ILeftComponent) => {
  return (
    <View style={navigationHeaderLeftComponent}>
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
    </View>
  );
};

export default LeftComponent;
