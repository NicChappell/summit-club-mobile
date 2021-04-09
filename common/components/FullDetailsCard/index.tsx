import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
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
          }}
          feature={feature}
        />
      )}
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Text style={featureName}>{feature.properties?.name}</Text>
          <Text style={featureElevation}>
            {feature.properties?.feet.toLocaleString()} ft
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={featureLocation}>
            {feature.properties?.county} County, {feature.properties?.state}
          </Text>
          <Text style={featureCoordinate}>
            {feature.properties?.latitude.toFixed(3)}°{" "}
            {feature.properties?.latitude > 0 ? "N" : "S"},{" "}
            {feature.properties?.longitude.toFixed(3)}°{" "}
            {feature.properties?.longitude > 0 ? "E" : "W"}
          </Text>
        </View>
        <View style={styles.footer}>
          <Button
            disabledStyle={styles.button}
            disabled={true}
            title="Explore"
            disabledTitleStyle={styles.buttonTitle}
          />
          <Text style={styles.count}>
            {checkInsLastWeek} check-ins
          </Text>
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
    paddingHorizontal: 8,
    paddingVertical: 4,
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
  count: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
  },
  footer: {
    alignItems: "baseline",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "baseline",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
