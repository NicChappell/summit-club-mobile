import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RightComponent = () => (
  <View style={styles.right}>{/* intentionally empty */}</View>
);

export default RightComponent;

const styles = StyleSheet.create({
  right: {
    alignItems: "center",
    backgroundColor: "green",
    height: 64,
    justifyContent: "center",
    width: 64,
  },
});
