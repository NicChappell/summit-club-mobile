import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { StaticMapBackground } from "../../../common/components";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../../common/styles";
import { getFeaturePhoto2 } from "../../../common/helpers";
import { defaultDimensions } from "./constants";
import { IHorizontalDetailsCard } from "./interfaces";

const HorizontalDetailsCard = ({
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
      containerStyle={[styles.cardContainerStyle, { ...dimensions }]}
      wrapperStyle={styles.cardWrapperStyle}
    >
      {featurePhoto ? (
        // render feature photo if available
        <Image source={featurePhoto} style={styles.featurePhoto} />
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
      <View style={styles.featureDetails}>
        <Text style={styles.featureName}>{feature.properties?.name}</Text>
        <Text style={styles.featureHierarchy}>
          {`${feature.properties?.county} County, ${feature.properties?.state}`}
        </Text>
        <Text style={styles.featureHierarchy}>
          {`${feature.properties?.country}, ${feature.properties?.continent}`}
        </Text>
        <Text style={styles.featureElevation}>
          {`${feature.properties?.feet.toLocaleString()} ft / ${feature.properties?.meters.toLocaleString()} m`}
        </Text>
        <Text style={styles.featureCoordinate}>
          {`${feature.properties?.latitude.toFixed(3)}° ${
            feature.properties?.latitude >= 0 ? "N" : "S"
          }, ${feature.properties?.longitude.toFixed(3)}° ${
            feature.properties?.longitude >= 0 ? "E" : "W"
          }`}
        </Text>
      </View>
    </Card>
  );
};

export default HorizontalDetailsCard;

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
  cardWrapperStyle: {
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
  featureDetails: {
    flex: 1,
    padding: 8,
  },
  featureCoordinate: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
  featureElevation: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
  featureHierarchy: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
  featurePhoto: {
    alignItems: "flex-end",
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderWidth: 0,
    height: "100%",
    justifyContent: "flex-end",
    width: 128,
  },
  featureName: {
    color: colors.black,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 18,
  },
});
