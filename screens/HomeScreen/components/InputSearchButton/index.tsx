import React from "react";
import { colors } from "../../../../common/styles";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { IInputSearchButton } from "./interfaces";

const InputSearchButton = ({ disabled, navigation }: IInputSearchButton) => (
  <Button
    buttonStyle={styles.button}
    containerStyle={styles.container}
    onPress={() => navigation.navigate("SearchResults")}
    style={styles.button}
    title="Search"
    titleStyle={styles.title}
    disabled={disabled}
  />
);

export default InputSearchButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.queenBlue,
    justifyContent: "center",
  },
  container: {
      marginLeft: 4,
  },
  title: {
    color: colors.white,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 16,
    lineHeight: 20
  },
});
