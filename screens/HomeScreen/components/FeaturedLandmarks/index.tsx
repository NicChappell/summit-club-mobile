import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { cardContainer, colors, shadow } from "../../../../common/styles";
import { featurePhotos } from "../../images/features";
import { IFeaturedLandmarkCard } from "./interfaces";

const DATA: IFeaturedLandmarkCard[] = [
  { id: "0", name: "Conundrum Peak", image: "https://picsum.photos/512" },
  { id: "1", name: "El Diente Peak", image: "https://picsum.photos/512" },
  { id: "2", name: "Grays Peak", image: "https://picsum.photos/512" },
  { id: "3", name: "Kit Carson Peak", image: "https://picsum.photos/512" },
  { id: "4", name: "Maroon Peak", image: "https://picsum.photos/512" },
  { id: "5", name: "Mt. Belford", image: "https://picsum.photos/512" },
  { id: "6", name: "Mt. Mrah", image: "https://picsum.photos/512" },
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

  const getFeaturePhoto = (name: string) => {
    // find target feature in collection of selected features with photos
    const feature = Object.values(featurePhotos).find(
      (feature) => feature.name === name
    );

    if (feature) {
      // return feature photo if available
      return feature.photo;
    } else {
      // else return placeholder image
      return { uri: "https://picsum.photos/1760/880" };
    }
  };

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
              source={getFeaturePhoto(item.name)}
              style={styles.cardImageStyle}
            >
              <View style={styles.cardImageViewStyle}>
                <Text style={styles.cardImageTextStyle}>{item.name}</Text>
              </View>
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
    fontSize: 12,
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
  cardImageViewStyle: {
    backgroundColor: colors.black50,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
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
