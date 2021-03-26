import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../../../styles";
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
    flex: 0,
    maxWidth: 240,
  },
  title: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 16,
  },
});
