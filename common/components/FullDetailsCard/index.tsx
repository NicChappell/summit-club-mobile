import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../../common/styles";
import { getFeaturePhoto } from "../../../common/helpers";
import { defaultDimensions } from "./constants";
import { IFullDetailsCard } from "./interfaces";

const FullDetailsCard = ({
  dimensions = defaultDimensions,
  item,
}: IFullDetailsCard) => {
  // destructure item
  const { checkInsLastWeek, feature } = item;

  const countyState =
    feature.properties?.county && feature.properties?.state ? (
      <Text style={styles.featureHierarchy}>
        {`${feature.properties?.county} County, ${feature.properties?.state}`}
      </Text>
    ) : null;

  const countryContinent =
    feature.properties?.country && feature.properties?.continent ? (
      <Text style={styles.featureHierarchy}>
        {`${feature.properties?.country}, ${feature.properties?.continent}`}
      </Text>
    ) : null;

  const coordinate = (
    <Text style={styles.featureCoordinate}>
      {`${feature.properties?.latitude}° ${
        feature.properties?.latitude >= 0 ? "N" : "S"
      }, ${feature.properties?.longitude}° ${
        feature.properties?.longitude >= 0 ? "E" : "W"
      }`}
    </Text>
  );

  const elevation = (
    <Text style={styles.featureElevation}>
      {`${feature.properties?.feet.toLocaleString()} ft / ${feature.properties?.meters.toLocaleString()} m`}
    </Text>
  );

  return (
    <Card
      containerStyle={[styles.cardContainerStyle, { ...dimensions }]}
      wrapperStyle={styles.cardWrapperStyle}
    >
      <Card.Image
        source={getFeaturePhoto(feature.properties?.name)}
        style={styles.cardImageStyle}
      >
        <Text style={styles.cardImageTextStyle}>
          {feature.properties?.name}
        </Text>
      </Card.Image>
      <View style={styles.cardContent}>
        <View style={styles.featureDetails}>
          {countyState}
          {countryContinent}
          {elevation}
          {coordinate}
        </View>
        <View style={styles.checkInDetails}>
          <Text style={styles.checkInCount}>{checkInsLastWeek}</Text>
        </View>
      </View>
    </Card>
  );
};

export default FullDetailsCard;

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
  cardContent: {
    alignSelf: "stretch",
    flexDirection: "row",
    padding: 8,
  },
  cardImageStyle: {
    alignItems: "flex-end",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderWidth: 0,
    height: 256,
    justifyContent: "flex-end",
    width: "100%",
  },
  cardImageTextStyle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: -1,
    },
  },
  cardWrapperStyle: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    flex: 1,
  },
  checkInCount: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
  checkInDetails: {
    alignItems: "flex-end",
    flex: 1,
  },
  featureDetails: {
    alignItems: "flex-start",
    flex: 2,
  },
  featureCoordinate: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
  featureElevation: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
  featureHierarchy: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
});
