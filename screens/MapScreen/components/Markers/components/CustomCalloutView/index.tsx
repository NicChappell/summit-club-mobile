import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const CustomMarkerView = ({ properties }) => {
  console.log(properties);

  const image = { uri: properties?.photo };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.imageBackground}>
        <View style={styles.caption}>
          <Text style={styles.text}>{properties?.mountainPeak}</Text>
          <Text style={styles.text}>{properties?.elevationFeet}</Text>
        </View>
        {/* <Image style={styles.image} source={{ uri: properties?.photo }} /> */}
      </ImageBackground>
    </View>
  );
};

export default CustomMarkerView;

const styles = StyleSheet.create({
  caption: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    alignItems: "flex-end",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  //   image: {
  //     width: 40,
  //     height: 40,
  //   },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    height: 112.5,
    justifyContent: "center",
    width: 150,
  },
  text: {
    color: "#ffffff"
  },
});
