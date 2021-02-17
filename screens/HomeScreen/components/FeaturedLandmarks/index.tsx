import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import {
  useFonts,
  NunitoSans_600SemiBold,
} from "@expo-google-fonts/nunito-sans";
import { colors } from "../../../../common/styles";
import { IFeaturedLandmarks } from "./interfaces";

const FeaturedLandmarks = ({ data }: IFeaturedLandmarks) => {
  // font hooks
  useFonts({ NunitoSans_600SemiBold });

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={data}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => console.log("TODO: HANDLE PRESS")}
        >
          <Card
            containerStyle={styles.cardContainerStyle}
            wrapperStyle={styles.cardWrapperStyle}
          >
            <Card.Image
              source={{ uri: item.image }}
              style={styles.cardImageStyle}
            >
              <Text style={styles.textStyle}>{item.title}</Text>
            </Card.Image>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    margin: 0,
    padding: 0,
  },
  cardImageStyle: {
    alignItems: "flex-end",
    height: "100%",
    justifyContent: "flex-end",
    width: "100%",
  },
  cardWrapperStyle: {
    width: 128,
  },
  separator: {
    width: 16,
  },
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  textStyle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textShadowColor: colors.black,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});

export default FeaturedLandmarks;
