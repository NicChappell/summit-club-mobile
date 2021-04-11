import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import {
  colors,
  featureDistance,
  featureLocation,
  featureName,
} from "../../../../../common/styles";
import { IFeatureCardContent } from "./interfaces";

const FeatureCardContent = ({ item }: IFeatureCardContent) => {
  // destructure item
  const { feature } = item;

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} style={styles.featureName}>
        {feature.properties?.name}
      </Text>
      <View style={styles.section}>
        <Text style={styles.featureLocation}>
          {feature.properties?.feet.toLocaleString()} ft
        </Text>
        <Text style={styles.featureDistance}>·</Text>
        <Text style={styles.featureDistance}>14.1 mi away</Text>
      </View>
    </View>
  );
};

export default FeatureCardContent;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 8,
  },
  featureDistance: {
    ...featureDistance,
    lineHeight: 18,
  },
  featureLocation: {
    ...featureLocation,
    lineHeight: 18,
  },
  featureName: {
    ...featureName,
    fontSize: 16,
    lineHeight: 20,
  },
  section: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
