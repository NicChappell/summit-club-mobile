import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../../common/styles";
import { ICheckInScreen } from "./interfaces";

const CheckInScreen = ({ navigation, route }: ICheckInScreen) => {
  return (
    <View style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>CheckInScreen</Text>
      </View>
      <Text>This is bottom text.</Text>
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});
