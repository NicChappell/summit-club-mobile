import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { StaticMapBackground } from "../../../../common/components";
import { getFeaturePhoto2 } from "../../../../common/helpers";
import { colors } from "../../../../common/styles";
import { ICheckInListItemDetails } from "./interfaces";

import { MOCK_FEATURE } from "../../../../data/mocks/features";

const CheckInListItemDetails = ({ checkIn }: ICheckInListItemDetails) => {
  // state hooks
  const [feature, setFeature] = useState<
    Feature<Geometry, GeoJsonProperties> | undefined
  >(undefined);
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);

  // effect hooks
  useEffect(() => {
    // TODO: WHAT'S BEST WAY TO GET FEATURE DATA? RETURN FROM FIRESTORE, OR QUERY LOCAL DB?
    // checkIn.featureId --> use to lookup feature
    const feature = MOCK_FEATURE;

    // update state
    setFeature(feature);
  }, []);

  // effect hooks
  useEffect(() => {
    // return early if feature is undefined
    if (!feature) return;

    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto2(feature.properties?.name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, [feature]);

  // return early if feature is undefined
  if (!feature) return null;

  return (
    <ListItem
      bottomDivider
      containerStyle={styles.listItemContainer}
      key={checkIn.id}
    >
      {featurePhoto ? (
        // render feature photo if available
        <View
          style={[
            styles.listItemImageContainer,
            {
              borderRadius: 4,
              height: 96,
              width: 96,
            },
          ]}
        >
          <Image source={featurePhoto} style={styles.listItemImage} />
        </View>
      ) : (
        // render map by default
        <StaticMapBackground
          containerStyles={{
            borderRadius: 4,
            height: 96,
            width: 96,
          }}
          feature={feature}
        />
      )}
      <ListItem.Content>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.header}>
              <Text style={styles.featureName}>{feature.properties?.name}</Text>
              <Text style={styles.featureElevation}>
                {`${feature.properties?.feet.toLocaleString()} ft / ${feature.properties?.meters.toLocaleString()} m`}
              </Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.featureLocation}>
                {feature.properties?.county} County, {feature.properties?.state}
              </Text>
              <Text style={styles.featureCoordinate}>
                {feature.properties?.latitude.toFixed(3)}°{" "}
                {feature.properties?.latitude > 0 ? "N" : "S"},{" "}
                {feature.properties?.longitude.toFixed(3)}°{" "}
                {feature.properties?.longitude > 0 ? "E" : "W"}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name={"ios-shield-checkmark-outline"}
              size={28}
              color={colors.queenBlue}
            />
            <Text
              style={{
                color: colors.black,
                fontFamily: "NunitoSans_400Regular",
                fontSize: 14,
              }}
            >
              Verified
            </Text>
          </View>
        </View>
      </ListItem.Content>
      {/* <ListItem.Chevron
        name={"ios-shield-checkmark-outline"}
        size={28}
        color={colors.queenBlue}
      /> */}
    </ListItem>
  );
};

export default CheckInListItemDetails;

const styles = StyleSheet.create({
  body: {
    alignItems: "flex-start",
    justifyContent: "center",
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
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 18,
  },
  header: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  listItemContainer: {},
  listItemImage: {
    height: "100%",
    width: "100%",
  },
  listItemImageContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
});
