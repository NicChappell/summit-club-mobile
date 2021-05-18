import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../common/styles";
import { IAppLoading } from "./types";

const AppLoading = ({ statusMessage }: IAppLoading) => {
  return (
    <View style={styles.container}>
      <Text>{statusMessage}</Text>
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
  },
});
