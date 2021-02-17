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
    width: 128,
  },
  cardImageStyle: {
    alignItems: "flex-end",
    height: "100%",
    justifyContent: "flex-end",
    width: "100%",
  },
  cardWrapperStyle: {},
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
    shadowColor: colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: -1,
    },
  },
});

export default FeaturedLandmarks;
