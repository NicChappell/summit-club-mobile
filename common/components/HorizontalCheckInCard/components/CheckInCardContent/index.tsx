import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
} from "../../../../styles";
import { ICheckInCardContent } from "./types";

const CheckInCardContent = ({ item }: ICheckInCardContent) => {
  // destructure item
  const {
    continent,
    country,
    county,
    created_at,
    feature_id,
    feet,
    id,
    latitude,
    longitude,
    meters,
    name,
    state,
    user_id,
  } = item;

  // // destructure user
  // const {
  //   contact: { firstName, lastName },
  // } = user;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.userName}>
          {"firstName"} {"lastName"}
        </Text>
        <Text style={styles.date}>
          {new Date(created_at).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.featureName}>{name}</Text>
        <Text style={featureLocation}>{county} County</Text>
        <Text style={featureCoordinate}>
          {latitude.toFixed(3)}° {latitude > 0 ? "N" : "S"},{" "}
          {longitude.toFixed(3)}° {longitude > 0 ? "E" : "W"}
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
