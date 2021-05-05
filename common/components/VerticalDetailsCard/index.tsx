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
} from "../../../common/styles";
import { getFeaturePhoto } from "../../../common/helpers";
import StaticMapBackground from "../StaticMapBackground";
import { FeatureCardContent } from "./components";
import { defaultDimensions } from "./constants";
import { IVerticalDetailsCard } from "./types";

const VerticalDetailsCard = ({
  dimensions = defaultDimensions,
  item,
}: IVerticalDetailsCard) => {
  // destructure item
  const { feature } = item;

  // state hooks
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);

  // effect hooks
  useEffect(() => {
    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto(feature.properties?.name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, []);

  return (
    <Card
      containerStyle={[styles.cardContainer, { ...dimensions }]}
      wrapperStyle={styles.cardWrapper}
    >
      {featurePhoto ? (
        // render feature photo if available
        <View style={styles.featurePhotoContainer}>
          <Image source={featurePhoto} style={styles.featurePhoto} />
        </View>
      ) : (
        // render static map by default
        <StaticMapBackground
          containerStyles={styles.staticMapBackgroundContainer}
          feature={feature}
        />
      )}
      <FeatureCardContent item={item} />
    </Card>
  );
};

export default VerticalDetailsCard;

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
  featurePhoto: {
    height: "100%",
    width: "100%",
  },
  featurePhotoContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: 176,
    overflow: "hidden",
    width: 174,
  },
  staticMapBackgroundContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: 176,
    overflow: "hidden",
    width: 174,
  },
});
