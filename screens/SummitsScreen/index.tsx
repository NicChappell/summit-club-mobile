import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../../common/styles";
import { ISummitsScreen } from "./interfaces";

const SummitsScreen = ({ navigation, route }: ISummitsScreen) => {
  return (
    <View style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>SummitsScreen</Text>
      </View>
      <Text>This is bottom text.</Text>
    </View>
  );
};

export default SummitsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});
