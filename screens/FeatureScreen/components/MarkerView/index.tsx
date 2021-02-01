import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../common/styles";

const MarkerView = () => {
  return <View style={styles.circle}></View>;
};

export default MarkerView;

const styles = StyleSheet.create({
  circle: {
    borderColor: colors.white,
    borderRadius: 24 / 2,
    borderWidth: 6,
    backgroundColor: colors.queenBlue,
    height: 24,
    width: 24,
  },
});
