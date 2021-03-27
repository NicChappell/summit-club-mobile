import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../styles";
import { ILeftComponent } from "./interfaces";

const LeftComponent = ({
  name,
  navigation,
  previousScreen,
}: ILeftComponent) => {
  return (
    <View style={styles.left}>
      <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
        <Ionicons
          name={"ios-chevron-back"}
          size={28}
          color={colors.queenBlue}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LeftComponent;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  left: {
    backgroundColor: "red",
    height: 64,
    width: 64,
  },
});
