import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../../common/styles";
import { IAccountScreen } from "./interfaces";

const AccountScreen = ({ navigation, route }: IAccountScreen) => {
  return (
    <View style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>AccountScreen</Text>
      </View>
      <Text>This is bottom text.</Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});
