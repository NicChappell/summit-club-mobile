import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../common/styles";
import { IMarkerView } from "./interfaces";

const MarkerView = ({ properties }: IMarkerView) => {
  // destructure feature properties
  const {
    class: classification,
    continent,
    country,
    county,
    feet,
    latitude,
    longitude,
    meters,
    name,
    state,
  } = properties!;

  let label = feet.toString().slice(0, -3);

  return (
    // <View style={styles.circle}>
    //   <Text style={styles.pinText}>{label}k</Text>
    // </View>
    <Ionicons
      color={colors.queenBlue}
      name={"ios-location"}
      size={40}
    />
  );
};

export default MarkerView;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: colors.pistachio,
    borderRadius: 32 / 2,
    height: 32,
    width: 32,
  },
  pinText: {
    color: colors.white,
    fontFamily: "NunitoSans_700Bold",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 32,
    textAlign: "center",
  },
});
