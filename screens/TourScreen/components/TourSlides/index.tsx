import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { ITourSlides } from "./interfaces";

const SCREEN_WIDTH = Dimensions.get("window").width;

const TourSlides = ({ data, onComplete }: ITourSlides) => {
  const next = (index: number) => {
    if (index === data.length - 1) {
      return (
        <Button
          title="Continue"
          buttonStyle={styles.buttonStyle}
          onPress={onComplete}
        />
      );
    }
  };

  return (
    <ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
      {data.map((slide, index) => {
        return (
          <View
            key={slide.text}
            style={[styles.slideStyle, { backgroundColor: slide.color }]}
          >
            <Text style={styles.textStyle}>{slide.text}</Text>
            {next(index)}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH,
    margin: 0,
  },
  textStyle: {
    fontSize: 30,
    color: "white",
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
    marginTop: 15,
  },
});

export default TourSlides;
