import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
} from "../../../../common/styles";
import { IRecentCheckInCardContent } from "./interfaces";

const RecentCheckInCardContent = ({}: IRecentCheckInCardContent) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.userName}>{"First Last"}</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.featureName}>{"Feature Name"}</Text>
        <Text style={featureLocation}>{"Name of County, CO"}</Text>
        <Text style={featureCoordinate}>
          {"88.888 N"}° {"111.111 W"}°
        </Text>
      </View>
    </View>
  );
};

export default RecentCheckInCardContent;

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
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
