import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { ISummitsScreen } from "./interfaces";

const SummitsScreen = ({ navigation, route }: ISummitsScreen) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>SummitsScreen</Text>
      </View>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

export default SummitsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
});
