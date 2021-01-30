import React from "react";
import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../../../../../common/styles/colors";

const CustomCalloutView = () => {
  return (
    <View style={styles.circle}>
      <Text style={styles.pinText}>14er</Text>
    </View>
  );
};

export default CustomCalloutView;

const styles = StyleSheet.create({
  circle: {
    borderRadius: 32 / 2,
    backgroundColor: COLORS.queenBlue,
    height: 32,
    width: 32,
  },
  pinText: {
    color: COLORS.white,
    fontFamily: "NunitoSans_700Bold",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 32,
    textAlign: "center",
  },
});
