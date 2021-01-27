import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
    // alignItems: "center",
    borderRadius: 32 / 2,
    backgroundColor: "red",
    // display: "flex",
    height: 32,
    // justifyContent: "center",
    width: 32,
  },
  pinText: {
    color: "white",
    fontFamily: "NunitoSans_700Bold",
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 32,
    textAlign: "center",
  },
});
