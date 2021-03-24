import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../../common/styles";
import { getFeaturePhoto, getFeaturePhoto2 } from "../../../common/helpers";
import { defaultDimensions } from "./constants";
import { IFullDetailsCard } from "./interfaces";

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
    const featurePhoto = getFeaturePhoto2(feature.properties?.name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, []);

  return (
    <Card
      containerStyle={[styles.cardContainer, { ...dimensions }]}
      wrapperStyle={styles.cardWrapper}
    >
      <Card.Image
        containerStyle={styles.cardImageContainer}
        source={getFeaturePhoto(feature.properties?.name)}
        style={styles.cardImage}
      />
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Text style={styles.featureName}>{feature.properties?.name}</Text>
          <Text style={styles.featureElevation}>
            {feature.properties?.feet.toLocaleString()} ft
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.featureLocation}>
            {feature.properties?.county} County, {feature.properties?.state}
          </Text>
          <Text style={styles.featureCoordinate}>
            {feature.properties?.latitude.toFixed(3)}°{" "}
            {feature.properties?.latitude >= 0 ? "N" : "S"},
            {feature.properties?.longitude.toFixed(3)}°{" "}
            {feature.properties?.longitude >= 0 ? "E" : "W"}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.count}>
            {checkInsLastWeek} check ins last week
          </Text>
          <Button
            buttonStyle={styles.button}
            title="Explore"
            titleStyle={styles.buttonTitle}
          />
        </View>
      </View>
    </Card>
  );
};

export default FullDetailsCard;

const styles = StyleSheet.create({
  body: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  button: {
    backgroundColor: colors.zomp,
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 14,
  },
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
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: "100%",
    width: "100%",
  },
  cardImageContainer: {
    height: "50%",
  },
  cardWrapper: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    flex: 1,
  },
  count: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
  },
  featureCoordinate: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
  },
  featureElevation: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
  },
  featureLocation: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
  },
  featureName: {
    color: colors.black,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 16,
  },
  footer: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
