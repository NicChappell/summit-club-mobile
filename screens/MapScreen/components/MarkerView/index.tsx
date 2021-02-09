import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../common/styles";
import { IMarkerView } from "./interfaces";

const MarkerView = ({ properties }: IMarkerView) => {
  // destructure feature properties
  const {
    continent,
    countries,
    feet,
    latitude,
    longitude,
    marker_size: markerSize,
    marker_symbol: markerSymbol,
    meters,
    name,
    regions,
    states,
  } = properties!;

  let label = feet.toString().slice(0, -3);

  return (
    <View style={styles.circle}>
      <Text style={styles.pinText}>{label}k</Text>
    </View>
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
