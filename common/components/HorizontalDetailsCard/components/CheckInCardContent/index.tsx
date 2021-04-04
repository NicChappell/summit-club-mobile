import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
} from "../../../../../common/styles";
import { ICheckInCardContent } from "./interfaces";

const CheckInCardContent = ({ item }: ICheckInCardContent) => {
  // destructure item
  const { feature, timestamp, user } = item;

  // destructure user
  const {
    contact: { firstName, lastName },
  } = user;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.userName}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.date}>
          {timestamp.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.featureName}>{feature.properties?.name}</Text>
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
    </View>
  );
};

export default CheckInCardContent;

const styles = StyleSheet.create({
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
  row: {},
  userName: {
    color: colors.black,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 18,
  },
});
