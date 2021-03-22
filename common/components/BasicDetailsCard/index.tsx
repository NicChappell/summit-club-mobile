import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import {
  borderRadius4,
  borderWidthReset,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../../common/styles";
import { Background } from "./components";
import { defaultDimensions } from "./constants";
import { IBasicDetailsCard } from "./interfaces";

const BasicDetailsCard = ({
  dimensions = defaultDimensions,
  item,
}: IBasicDetailsCard) => {
  return (
    <Card
      containerStyle={[styles.cardContainerStyle, { ...dimensions }]}
      wrapperStyle={styles.cardWrapperStyle}
    >
      <Background item={item} />
    </Card>
  );
};

export default BasicDetailsCard;

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...borderWidthReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    backgroundColor: "transparent",
    paddingBottom: 2,
    paddingLeft: 2,
  },
  cardWrapperStyle: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    flex: 1,
  },
});
