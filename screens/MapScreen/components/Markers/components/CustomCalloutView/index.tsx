import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const CONTENT_HEIGHT = 112.5;
const CONTENT_WIDTH = 150;

const CustomMarkerView = ({ properties }: any) => {

  const image = { uri: properties?.photo };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.imageBackground}>
        <View style={styles.caption}>
          <Text style={styles.text}>{properties?.mountainPeak}</Text>
          <Text style={styles.text}>
            {parseInt(properties?.elevationFeet).toLocaleString()} ft
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CustomMarkerView;

const styles = StyleSheet.create({
  caption: {
    alignItems: "flex-end",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 8,
  },
  container: {},
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    height: CONTENT_HEIGHT,
    justifyContent: "center",
    width: CONTENT_WIDTH,
  },
  text: {
    color: "white",
    textShadowColor: "black",
    textShadowOffset: {
      width: -1,
      height: 1,
    },
    textShadowRadius: 1,
  },
});
