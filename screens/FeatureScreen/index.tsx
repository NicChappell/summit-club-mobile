import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IFeatureScreen } from "./interfaces";

const FeatureScreen = ({ navigation, route }: IFeatureScreen) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is top text.</Text>
      <Text>FeatureScreen</Text>
      <Text>{route.params.id}</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

export default FeatureScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
});
