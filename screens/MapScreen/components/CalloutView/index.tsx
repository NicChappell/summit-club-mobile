import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../common/styles";
import { ICalloutView } from "./interfaces";

const CONTENT_HEIGHT = 112.5;
const CONTENT_WIDTH = 150;

const CalloutView = ({ properties }: ICalloutView) => {
  // destructure feature properties
  const {
    class: classification,
    continent,
    country,
    county,
    feet,
    latitude,
    longitude,
    meters,
    name,
    state,
  } = properties!;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{feet.toLocaleString()} ft</Text>
      <Text style={styles.text}>{meters.toLocaleString()} m</Text>
    </View>
  );
};

export default CalloutView;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: CONTENT_HEIGHT,
    justifyContent: "center",
    padding: 8,
    width: CONTENT_WIDTH,
  },
  text: {
    color: colors.black,
  },
});
