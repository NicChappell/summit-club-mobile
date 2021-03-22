import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-elements";
import {
  borderRadius4,
  borderWidthReset,
  colors,
} from "../../../../../common/styles";
import { getFeaturePhoto } from "../../../../../common/helpers";
import { IBackground } from "./interfaces";

const Background = ({ item }: IBackground) => {
  switch (item.type) {
    case "range":
      return (
        <View style={styles.rangeViewStyle}>
          <Text style={styles.rangeTextStyle}>{item.name}</Text>
        </View>
      );
    default:
      return (
        <Card.Image
          source={getFeaturePhoto("Test")}
          style={styles.cardImageStyle}
        >
          <View style={styles.cardImageViewStyle}>
            <Text style={styles.cardImageTextStyle}>Test</Text>
          </View>
        </Card.Image>
      );
  }
};

export default Background;

const styles = StyleSheet.create({
  cardImageStyle: {
    ...borderRadius4,
    ...borderWidthReset,
    alignItems: "flex-end",
    height: "100%",
    justifyContent: "flex-end",
    overflow: "hidden",
    width: "100%",
  },
  cardImageTextStyle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardImageViewStyle: {
    backgroundColor: colors.black75,
    borderTopLeftRadius: 4,
  },
  rangeTextStyle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
  },
  rangeViewStyle: {
    alignItems: "center",
    backgroundColor: colors.zomp,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});
