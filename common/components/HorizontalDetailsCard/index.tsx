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
import { getFeaturePhoto } from "../../../common/helpers";
import { ICheckIn, ISummit } from "../../../services";
import StaticMapBackground from "../StaticMapBackground";
import { CheckInCardContent, FeatureCardContent } from "./components";
import { defaultDimensions } from "./constants";
import { IHorizontalDetailsCard } from "./interfaces";

const HorizontalDetailsCard = ({
  dimensions = defaultDimensions,
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
        // render static map by default
        <StaticMapBackground
          containerStyles={{
            borderBottomLeftRadius: 4,
            borderTopLeftRadius: 4,
            width: 128,
          }}
          feature={feature}
        />
      )}
      {renderCardContent(item)}
      {/* <View style={{ flex: 1, padding: 8 }}>
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
      </View> */}
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
