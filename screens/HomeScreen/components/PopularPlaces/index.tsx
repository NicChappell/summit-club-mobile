import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { cardContainer, colors, shadow } from "../../../../common/styles";
import { Places, IPopularPlaces } from "../../../../services";
import { getFeaturePhoto } from "../../helpers";

const PopularPlaces = () => {
  // state hooks
  const [popularPlaces, setPopularPlaces] = useState<
    IPopularPlaces[] | undefined
  >(undefined);

  // effect hooks
  useEffect(() => {
    Places.getPopularPlaces()
      .then((popularPlaces) => {
        setPopularPlaces(popularPlaces);
      })
      .catch((error) => {
        // TODO: HANDLE THE ERROR -- DISPATCH ERROR ACTION
      });
  }, []);

  return (
    <View style={styles.container}>
      {popularPlaces?.map((place, index) => {
        const countyState =
          place.feature.properties?.county &&
          place.feature.properties?.state ? (
            <Text style={styles.featureHierarchy}>
              {`${place.feature.properties?.county} County, ${place.feature.properties?.state}`}
            </Text>
          ) : null;

        const countryContinent =
          place.feature.properties?.country &&
          place.feature.properties?.continent ? (
            <Text style={styles.featureHierarchy}>
              {`${place.feature.properties?.country}, ${place.feature.properties?.continent}`}
            </Text>
          ) : null;

        const coordinate = (
          <Text style={styles.featureCoordinate}>
            {`${place.feature.properties?.latitude}° ${
              place.feature.properties?.latitude >= 0 ? "N" : "S"
            }, ${place.feature.properties?.longitude}° ${
              place.feature.properties?.longitude >= 0 ? "E" : "W"
            }`}
          </Text>
        );

        const elevation = (
          <Text style={styles.featureElevation}>
            {`${place.feature.properties?.feet.toLocaleString()} ft / ${place.feature.properties?.meters.toLocaleString()} m`}
          </Text>
        );

        return (
          <Card
            containerStyle={styles.cardContainerStyle}
            key={index}
            wrapperStyle={styles.cardWrapperStyle}
          >
            <Card.Image
              source={getFeaturePhoto(place.feature.properties?.name)}
              style={styles.cardImageStyle}
            >
              <Text style={styles.cardImageTextStyle}>
                {place.feature.properties?.name}
              </Text>
            </Card.Image>
            <View style={styles.cardContent}>
              <View style={styles.featureDetails}>
                {countyState}
                {countryContinent}
                {elevation}
                {coordinate}
              </View>
              <View style={styles.checkInDetails}>
                <Text style={styles.checkInCount}>
                  {place.checkInsLastWeek}
                </Text>
              </View>
            </View>
          </Card>
        );
      })}
    </View>
  );
};

export default PopularPlaces;

const styles = StyleSheet.create({
  container: {},
  cardContainerStyle: {
    ...cardContainer,
    ...shadow,
    alignSelf: "stretch",
    marginBottom: 32,
    marginHorizontal: 2,
  },
  cardContent: {
    alignSelf: "stretch",
    flexDirection: "row",
    padding: 8,
  },
  cardImageStyle: {
    alignItems: "flex-end",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderWidth: 0,
    height: 256,
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
  checkInCount: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
  checkInDetails: {
    alignItems: "flex-end",
    flex: 1,
  },
  featureDetails: {
    alignItems: "flex-start",
    flex: 2,
  },
  featureCoordinate: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
  featureElevation: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
  featureHierarchy: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
  featureImage: {
    alignItems: "flex-end",
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderWidth: 0,
    height: 128,
    justifyContent: "flex-end",
    width: 128,
  },
  featureName: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
  },
});
