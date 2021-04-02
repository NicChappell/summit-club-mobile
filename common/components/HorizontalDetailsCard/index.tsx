import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
import { getFeaturePhoto2 } from "../../../common/helpers";
import StaticMapBackground from "../StaticMapBackground";
import { defaultDimensions } from "./constants";
import { IHorizontalDetailsCard } from "./interfaces";

const HorizontalDetailsCard = ({
  ContentComponent,
  dimensions = defaultDimensions,
  feature,
}: IHorizontalDetailsCard) => {
  // state hooks
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);

  // effect hooks
  useEffect(() => {
    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto2(feature.properties?.name);

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
        <Card.Image
          containerStyle={[
            styles.cardImageContainer,
            {
              borderBottomLeftRadius: 4,
              borderTopLeftRadius: 4,
              width: 128,
            },
          ]}
          source={featurePhoto}
          style={styles.cardImage}
        />
      ) : (
        // render map by default
        <StaticMapBackground
          containerStyles={{
            borderBottomLeftRadius: 4,
            borderTopLeftRadius: 4,
            width: 128,
          }}
          feature={feature}
        />
      )}
      {false ? (
        <View style={styles.cardContentContainer}>
          <Text style={featureName}>{feature.properties?.name}</Text>
          <Text style={featureLocation}>
            {`${feature.properties?.county} County, ${feature.properties?.state}`}
          </Text>
          <Text style={featureElevation}>
            {`${feature.properties?.feet.toLocaleString()} ft / ${feature.properties?.meters.toLocaleString()} m`}
          </Text>
          <Text style={featureCoordinate}>
            {feature.properties?.latitude.toFixed(3)}°{" "}
            {feature.properties?.latitude > 0 ? "N" : "S"},{" "}
            {feature.properties?.longitude.toFixed(3)}°{" "}
            {feature.properties?.longitude > 0 ? "E" : "W"}
          </Text>
        </View>
      ) : (
        <View style={styles.cardContentContainer}>{ContentComponent}</View>
      )}
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
  cardContentContainer: {
    flex: 1,
    padding: 8,
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },
  cardImageContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
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
});
