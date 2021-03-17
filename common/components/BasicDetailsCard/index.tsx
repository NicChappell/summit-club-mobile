import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import {
  borderReset,
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
  navigation,
}: IBasicDetailsCard) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Feature", {
          id: 1,
          name: "Test",
        })
      }
    >
      <Card
        containerStyle={[styles.cardContainerStyle, { ...dimensions }]}
        wrapperStyle={styles.cardWrapperStyle}
      >
        <Background item={item} />
      </Card>
    </TouchableOpacity>
  );
};

export default BasicDetailsCard;

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...borderReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    paddingBottom: 2,
    paddingLeft: 2,
  },
  cardWrapperStyle: {
    ...marginReset,
    ...paddingReset,
    ...shadow,
    height: "100%",
    width: "100%",
  },
});
