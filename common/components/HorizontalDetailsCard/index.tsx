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
import { ICheckIn, ISummit } from "../../../services";
import StaticMapBackground from "../StaticMapBackground";
import { CheckInCardContent, FeatureCardContent } from "./components";
import { IHorizontalDetailsCard } from "./types";

const HorizontalDetailsCard = ({
  dimensions,
  item,
}: IHorizontalDetailsCard) => {
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

  const renderCardContent = (item: ICheckIn | ISummit) => {
    switch (item.type) {
      case "filteredSummit":
        return <FeatureCardContent item={item} />;
      case "recentCheckIn":
        return <CheckInCardContent item={item} />;
      default:
        return null;
    }
  };

  let imageDimensions:
    | {
        height: number;
        width: number;
      }
    | undefined;
  switch (item.type) {
    case "filteredSummit":
      imageDimensions = {
        height: 94,
        width: 96,
      };
      break;
    case "recentCheckIn":
      imageDimensions = {
        height: 126,
        width: 128,
      };
      break;
    default:
      imageDimensions = undefined;
  }

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
        <StaticMapBackground
          containerStyles={[styles.imageContainer, imageDimensions]}
          feature={feature}
        />
      )}
      {renderCardContent(item)}
    </Card>
  );
};

export default HorizontalDetailsCard;

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
