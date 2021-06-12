import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../styles";
import { getFeaturePhoto } from "../../helpers";
import StaticMapBackground from "../StaticMapBackground";
import { CheckInCardContent } from "./components";
import { IHorizontalCheckInCard } from "./types";

const HorizontalCheckInCard = ({
  dimensions,
  item,
}: IHorizontalCheckInCard) => {
  // destructure item
  const { name } = item;

  // state hooks
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);

  // effect hooks
  useEffect(() => {
    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto(name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, []);

  const imageDimensions = {
    height: 126,
    width: 128,
  };

  return (
    <Card
      containerStyle={[styles.cardContainer, { ...dimensions }]}
      wrapperStyle={styles.cardWrapper}
    >
      {featurePhoto ? (
        // render feature photo if available
        <View style={[styles.imageContainer, imageDimensions]}>
          <Image source={featurePhoto} style={styles.featurePhoto} />
        </View>
      ) : (
        // render static map by default
        // <StaticMapBackground
        //   containerStyles={[styles.imageContainer, imageDimensions]}
        //   feature={feature}
        // />
        <View></View>
      )}
      <CheckInCardContent item={item} />
    </Card>
  );
};

export default HorizontalCheckInCard;

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
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },
  featurePhoto: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    overflow: "hidden",
  },
});
