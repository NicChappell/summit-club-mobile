import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../common/styles";
import { ICheckBoxTitle } from "./interfaces";

const CheckBoxTitle = ({ setVisible }: ICheckBoxTitle) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        I agree to the{" "}
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.link}>
          <Text style={styles.linkText}>terms and conditions</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default CheckBoxTitle;

const styles = StyleSheet.create({
  container: {},
  content: {
    color: colors.black,
    fontSize: 14,
    lineHeight: 28,
  },
  link: {
    justifyContent: "flex-end",
  },
  linkText: {
    color: colors.queenBlue,
    fontSize: 14,
    lineHeight: 21,
    textDecorationLine: "underline",
  },
});
