import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../../common/styles";
import { getFeaturePhoto } from "../../../common/helpers";
import StaticMapBackground from "../StaticMapBackground";
import { IFullDetailsCard } from "./types";

const FullDetailsCard = ({ dimensions, item }: IFullDetailsCard) => {
  // destructure item
  const { checkInsLastWeek, feature } = item;

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
        <View style={styles.imageContainer}>
          <Image source={featurePhoto} style={styles.featurePhoto} />
        </View>
      ) : (
        // render static map by default
        <StaticMapBackground
          containerStyles={styles.imageContainer}
          feature={feature}
        />
      )}
      <View style={styles.cardContent}>
        <View style={styles.leftColumn}>
          <Text style={[featureName, { marginBottom: 8 }]}>
            {feature.properties?.name}
          </Text>
          <Text style={featureLocation}>
            {feature.properties?.feet.toLocaleString()} ft ·{" "}
            {feature.properties?.county} County
          </Text>
          <Text style={featureCoordinate}>
            {feature.properties?.latitude.toFixed(3)}°{" "}
            {feature.properties?.latitude > 0 ? "N" : "S"},{" "}
            {feature.properties?.longitude.toFixed(3)}°{" "}
            {feature.properties?.longitude > 0 ? "E" : "W"}
          </Text>
        </View>
        {checkInsLastWeek && (
          <View style={styles.rightColumn}>
            <Ionicons
              name={"ios-shield-checkmark-outline"}
              size={24}
              color={colors.queenBlue}
            />
            <Text style={styles.verified}>
              {checkInsLastWeek} verified{"\n"}check-ins
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

export default FullDetailsCard;

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
  cardContent: {
    alignItems: "stretch",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    padding: 8,
  },
  cardWrapper: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    flex: 1,
  },
  featurePhoto: {
    height: "100%",
    width: "100%",
  },
  imageContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: 144,
    overflow: "hidden",
    width: "100%",
  },
  leftColumn: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  rightColumn: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  count: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
  },
  verified: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
    textAlign: "center",
  },
});
