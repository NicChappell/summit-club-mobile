import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../common/styles";

const MarkerView = () => {
  return <View style={styles.circle}></View>;
};

export default MarkerView;

const styles = StyleSheet.create({
  circle: {
    borderColor: colors.queenBlue75,
    borderRadius: 36 / 2,
    borderWidth: 2,
    backgroundColor: colors.queenBlue25,
    height: 36,
    width: 36,
  },
});
