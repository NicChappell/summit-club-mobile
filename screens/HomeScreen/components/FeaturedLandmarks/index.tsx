import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { cardContainer, colors, shadow } from "../../../../common/styles";
import { IFeaturedLandmarkCard } from "./interfaces";

const DATA: IFeaturedLandmarkCard[] = [
  { id: "0", title: "Mt Lorem", image: "https://picsum.photos/512" },
  { id: "1", title: "Mt Ipsum", image: "https://picsum.photos/512" },
  { id: "2", title: "Mt Dolar", image: "https://picsum.photos/512" },
  { id: "3", title: "Mt Sit", image: "https://picsum.photos/512" },
  { id: "4", title: "Mt Amet", image: "https://picsum.photos/512" },
];

const FeaturedLandmarks = () => {
  // state hooks
  const [data, setData] = useState<IFeaturedLandmarkCard[] | undefined>(
    undefined
  );

  // effect hooks
  useEffect(() => {
    setData(DATA);
  }, []);

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
              <Text style={styles.cardImageTextStyle}>{item.title}</Text>
            </Card.Image>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
};

export default FeaturedLandmarks;

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...cardContainer,
    ...shadow,
    height: 124,
    margin: 2,
    width: 124,
  },
  cardImageStyle: {
    alignItems: "flex-end",
    borderRadius: 4,
    borderWidth: 0,
    height: "100%",
    justifyContent: "flex-end",
    width: "100%",
  },
  cardImageTextStyle: {
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
});
