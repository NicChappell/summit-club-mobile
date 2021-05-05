import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
} from "../../../../../common/styles";
import { IFeatureCardContent } from "./types";

const FeatureCardContent = ({ item }: IFeatureCardContent) => {
  // destructure item
  const { feature } = item;

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Text numberOfLines={1} style={featureName}>
          {feature.properties?.name}
        </Text>
        <View>
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
      </View>
      <View style={styles.rightColumn}>
        <Ionicons
          name={"ios-shield-checkmark-outline"}
          size={24}
          color={colors.queenBlue}
        />
        <Text style={styles.verified}>Verified{"\n"}check-in</Text>
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
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  leftColumn: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  rightColumn: {
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "column",
    justifyContent: "center",
  },
  verified: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
});
