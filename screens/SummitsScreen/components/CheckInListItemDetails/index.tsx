import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { StaticMapBackground } from "../../../../common/components";
import { getFeaturePhoto2 } from "../../../../common/helpers";
import {
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
} from "../../../../common/styles";
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
    <ListItem bottomDivider key={checkIn.id}>
      {featurePhoto ? (
        // render feature photo if available
        <View
          style={[
            styles.listItemImageContainer,
            {
              borderRadius: 4,
              height: 80,
              width: 80,
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
            height: 80,
            width: 80,
          }}
          feature={feature}
        />
      )}
      <ListItem.Content>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={featureName}>{feature.properties?.name}</Text>
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
          <View style={styles.rightColumn}>
            <Ionicons
              name={"ios-shield-checkmark-outline"}
              size={24}
              color={colors.queenBlue}
            />
            <Text style={styles.verified}>Verified</Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default CheckInListItemDetails;

const styles = StyleSheet.create({
  listItemImage: {
    height: "100%",
    width: "100%",
  },
  listItemImageContainer: {
    height: "100%",
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
  row: {
    flex: 1,
    flexDirection: "row",
  },
  verified: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
});
