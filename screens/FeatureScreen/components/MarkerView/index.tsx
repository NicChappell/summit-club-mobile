import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../common/styles";

const MarkerView = () => {
  return <View style={styles.circle}></View>;
};

export default MarkerView;

const styles = StyleSheet.create({
  circle: {
    borderColor: colors.queenBlue,
    borderRadius: 48 / 2,
    borderWidth: 3,
    backgroundColor: colors.queenBlue50,
    height: 48,
    width: 48,
  },
});
