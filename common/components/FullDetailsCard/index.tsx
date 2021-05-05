import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
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
import { defaultDimensions } from "./constants";
import { IFullDetailsCard } from "./types";

const FullDetailsCard = ({
  dimensions = defaultDimensions,
  item,
}: IFullDetailsCard) => {
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
        <Card.Image
          containerStyle={[
            styles.cardImageContainer,
            {
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              height: "50%",
            },
          ]}
          source={featurePhoto}
          style={styles.cardImage}
        />
      ) : (
        // render static map by default
        <StaticMapBackground
          containerStyles={{
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            height: "50%",
            width: "100%",
          }}
          feature={feature}
        />
      )}
      <View style={styles.cardContent}>
        <View style={styles.row}>
          <Text style={featureName}>{feature.properties?.name}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
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
    alignItems: "flex-start",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: "space-between",
    height: "50%",
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
    flex: 1,
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
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verified: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
    textAlign: "center",
  },
});
