import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../common/styles";

const MarkerView = () => {
  return (
    <View style={styles.circle}>
      <Text style={styles.pinText}>14er</Text>
    </View>
  );
};

export default MarkerView;

const styles = StyleSheet.create({
  circle: {
    borderRadius: 32 / 2,
    backgroundColor: colors.queenBlue,
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
