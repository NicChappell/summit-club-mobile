import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import {
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
  marginReset,
  paddingReset,
} from "../../../../common/styles";
import { IFeatureCardContent } from "./interfaces";

const FeatureCardContent = ({}: IFeatureCardContent) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={featureName}>{"Feature Name"}</Text>
        <Text style={featureElevation}>{"14,245 ft"}</Text>
      </View>
      <View style={styles.body}>
        <Text style={featureLocation}>{"Name of County, CO"}</Text>
        <Text style={featureCoordinate}>
          {"88.888 N"}° {"111.111 W"}°
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
