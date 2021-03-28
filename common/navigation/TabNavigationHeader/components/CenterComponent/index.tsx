import React from "react";
import { View, Text } from "react-native";
import {
  navigationHeaderCenterComponent,
  navigationHeaderTitle,
} from "../../../../styles";
import { ICenterComponent } from "./interfaces";

const CenterComponent = ({ title }: ICenterComponent) => {
  return (
    <View style={navigationHeaderCenterComponent}>
      <Text numberOfLines={1} style={navigationHeaderTitle}>
        {title}
      </Text>
    </View>
  );
};

export default CenterComponent;
