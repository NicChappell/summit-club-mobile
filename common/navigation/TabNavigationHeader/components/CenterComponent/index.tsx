import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors, marginReset, paddingReset } from "../../../../styles";
import { ICenterComponent } from "./interfaces";

const CenterComponent = ({ title }: ICenterComponent) => {
  return (
    <View style={styles.center}>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

export default CenterComponent;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    backgroundColor: "orange",
    height: 64,
    justifyContent: "center",
  },
  title: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 16,
  },
});
