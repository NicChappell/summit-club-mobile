import React from "react";
import { StyleSheet, View } from "react-native";

const RightComponent = () => (
  <View style={styles.right}>{/* intentionally empty */}</View>
);

export default RightComponent;

const styles = StyleSheet.create({
  right: {
    flex: 1,
    paddingRight: 12,
  },
});
