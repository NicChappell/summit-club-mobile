import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "../../common/styles";
import { IContactScreen } from "./interfaces";

const ContactScreen = ({ navigation, route }: IContactScreen) => {
  return (
    <View style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>ContactScreen</Text>
      </View>
      <Text>This is bottom text.</Text>
    </View>
  );
};

export default ContactScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});
