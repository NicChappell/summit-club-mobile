import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import {
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
} from "../../../../../common/styles";
import { IFeatureCardContent } from "./interfaces";

const FeatureCardContent = ({ item }: IFeatureCardContent) => {
  // destructure item
  const { feature } = item;

  return (
    <View style={styles.container}>
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
      </View>
    </View>
  );
};

export default FeatureCardContent;

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
  container: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 8,
  },
  date: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
  },
  featureName: {
    ...featureName,
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
  userName: {
    color: colors.black,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 18,
  },
});
