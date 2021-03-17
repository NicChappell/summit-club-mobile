import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-elements";
import {
  borderRadius4,
  borderReset,
  colors,
  shadow,
} from "../../../../../common/styles";
import { getFeaturePhoto } from "../../../../helpers";
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
    ...borderReset,
    alignItems: "flex-end",
    height: "100%",
    justifyContent: "flex-end",
    width: "100%",
  },
  cardImageTextStyle: {
    ...shadow,
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardImageViewStyle: {
    backgroundColor: colors.black50,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
  },
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
