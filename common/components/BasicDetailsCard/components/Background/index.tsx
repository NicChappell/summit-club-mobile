import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { borderRadius4, colors } from "../../../../../common/styles";
import { IBackground } from "./types";

const Background = ({ item }: IBackground) => {
  switch (item.type) {
    case "range":
      return (
        <View style={styles.rangeViewStyle}>
          <Text style={styles.rangeTextStyle}>{item.name}</Text>
        </View>
      );
    default:
      return null;
  }
};

export default Background;

const styles = StyleSheet.create({
  rangeTextStyle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
  },
  rangeViewStyle: {
    ...borderRadius4,
    alignItems: "center",
    backgroundColor: colors.zomp,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});
