import React from "react";
import { StyleSheet, Switch } from "react-native";
import { colors } from "../../styles";
import { ICustomSwitch } from "./types";

const CustomSwitch = ({ handleSwitchChange, value }: ICustomSwitch) => {
  return (
    <Switch
      trackColor={{ false: colors.black05, true: colors.pistachio75 }}
      thumbColor={colors.white}
      ios_backgroundColor={colors.black05}
      onValueChange={handleSwitchChange}
      style={styles.switch}
      value={value}
    />
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  switch: {
    borderColor: colors.queenBlue,
    borderWidth: 2,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginRight: -4,
  },
});
