import React, { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { ITourSlides } from "./interfaces";

import * as Location from "expo-location";

const SCREEN_WIDTH = Dimensions.get("window").width;

const TourSlides = ({ data, onComplete }: ITourSlides) => {
  // effect hooks
  useEffect(() => {
    Location.requestForegroundPermissionsAsync()
      .then((permissions) => {
        console.log(permissions);

        return Location.getForegroundPermissionsAsync();
      })
      .then((permissions) => {
        console.log(permissions);

        return Location.getCurrentPositionAsync();
      })
      .then((location) => {
        // LocationAccuracy
        // Accuracy.Lowest  1  Accurate to the nearest three kilometers.
        // Accuracy.Low  2  Accurate to the nearest kilometer.
        // Accuracy.Balanced  3  Accurate to within one hundred meters.
        // Accuracy.High  4  Accurate to within ten meters of the desired target.
        // Accuracy.Highest  5  The best level of accuracy available.
        // Accuracy.BestForNavigation  6  The highest possible accuracy that uses additional sensor data to facilitate navigation apps.
        console.log(location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
            <Button
              title="Grant permission"
              buttonStyle={styles.buttonStyle}
              onPress={() => console.log("TODO")}
            />
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
