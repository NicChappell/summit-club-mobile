import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../styles";
import { defaultDimensions } from "./constants";
import { IApparelDetailsCard } from "./interfaces";

const ApparelDetailsCard = ({
  dimensions = defaultDimensions,
  item,
}: IApparelDetailsCard) => {
  console.log(item);
  // state hooks
  const [fit, setFit] = useState<string>("");

  // effect hooks
  useEffect(() => {}, []);

  return (
    <Card
      containerStyle={[styles.cardContainer, { ...dimensions }]}
      wrapperStyle={styles.cardWrapper}
    >
    </Card>
  );
};

export default ApparelDetailsCard;

const styles = StyleSheet.create({
  cardContainer: {
    ...borderWidthReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    backgroundColor: "transparent",
    paddingBottom: 2,
    paddingLeft: 2,
  },
  cardWrapper: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    alignItems: "flex-start",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
  },
});
