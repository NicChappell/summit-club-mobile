import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import * as turf from "@turf/turf";
import { getFeaturePhoto } from "../../helpers";
import {
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
} from "../../styles";
import StaticMapBackground from "../StaticMapBackground";
import { ISummitDetailsListItem } from "./types";

const SummitDetailsListItem = ({ item }: ISummitDetailsListItem) => {
  // destructure item
  const {
    checkedIn,
    checkedOff,
    class: classification,
    continent,
    country,
    county,
    feet,
    id,
    latitude,
    longitude,
    meters,
    name,
    state,
  } = item;
  console.log("item: ", item);

  // state hooks
  const [feature, setFeature] = useState<any>();
  const [featurePhoto, setFeaturePhoto] = useState<any>(null);

  // effect hooks
  useEffect(() => {
    // create a GeoJSON Geometry
    const geometry: Geometry = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    // create a GeoJSON properties object
    const properties: GeoJsonProperties = { ...item };

    // create a GeoJSON Feature
    const feature: Feature = turf.feature(geometry, properties);

    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto(name);

    // update local state
    setFeature(feature);
    setFeaturePhoto(featurePhoto);
  }, []);

  return null;

  return (
    <ListItem bottomDivider key={id}>
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
        // render static map by default
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
            <Text style={featureName}>{name}</Text>
            <Text style={featureLocation}>
              {feet.toLocaleString()} ft · {county} County
            </Text>
            <Text style={featureCoordinate}>
              {latitude.toFixed(3)}° {latitude > 0 ? "N" : "S"},{" "}
              {longitude.toFixed(3)}° {longitude > 0 ? "E" : "W"}
            </Text>
          </View>
          {checkedIn && (
            <View style={styles.rightColumn}>
              <Ionicons
                name={"ios-shield-checkmark-outline"}
                size={24}
                color={colors.queenBlue}
              />
              <Text style={styles.verified}>Verified{"\n"}check-in</Text>
            </View>
          )}
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default SummitDetailsListItem;

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
