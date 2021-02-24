import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { cardContainer, colors, shadow } from "../../../../common/styles";
import { getFeaturePhoto } from "../../helpers";
import { IPopularLandmarkCard } from "./interfaces";

import { MockFeature } from "../../../../data/mocks/features";
const DATA: IPopularLandmarkCard[] = [
  {
    checkInsLastWeek: 123,
    checkInsLastMonth: 234,
    checkInsLastYear: 345,
    checkInsAllTime: 456,
    feature: MockFeature,
  },
  {
    checkInsLastWeek: 123,
    checkInsLastMonth: 234,
    checkInsLastYear: 345,
    checkInsAllTime: 456,
    feature: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-107.0664035, 39.1186541],
      },
      properties: {
        feet: 14107,
        meters: 4300,
        latitude: 39.1186541,
        longitude: -107.0664035,
        name: "Snowmass Mountain",
        class: "Summit",
        county: "Gunnison",
        state: "CO",
        country: "United States",
        continent: "North America",
      },
    },
  },
  {
    checkInsLastWeek: 123,
    checkInsLastMonth: 234,
    checkInsLastYear: 345,
    checkInsAllTime: 456,
    feature: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-106.9870852, 39.076094],
      },
      properties: {
        feet: 14016,
        meters: 4272,
        latitude: 39.076094,
        longitude: -106.9870852,
        name: "North Maroon Peak",
        class: "Summit",
        county: "Pitkin",
        state: "CO",
        country: "United States",
        continent: "North America",
      },
    },
  },
];

const PopularLandmarks = () => {
  // state hooks
  const [data, setData] = useState<IPopularLandmarkCard[] | undefined>(
    undefined
  );

  // effect hooks
  useEffect(() => {
    setData(DATA);
  }, []);

  return (
    <View style={styles.container}>
      {data?.map((landmark, index) => {
        const countyState =
          landmark.feature.properties?.county &&
          landmark.feature.properties?.state ? (
            <Text style={styles.featureHierarchy}>
              {`${landmark.feature.properties?.county} County, ${landmark.feature.properties?.state}`}
            </Text>
          ) : null;

        const countryContinent =
          landmark.feature.properties?.country &&
          landmark.feature.properties?.continent ? (
            <Text style={styles.featureHierarchy}>
              {`${landmark.feature.properties?.country}, ${landmark.feature.properties?.continent}`}
            </Text>
          ) : null;

        const coordinate = (
          <Text style={styles.featureCoordinate}>
            {`${landmark.feature.properties?.latitude}° ${
              landmark.feature.properties?.latitude >= 0 ? "N" : "S"
            }, ${landmark.feature.properties?.longitude}° ${
              landmark.feature.properties?.longitude >= 0 ? "E" : "W"
            }`}
          </Text>
        );

        const elevation = (
          <Text style={styles.featureElevation}>
            {`${landmark.feature.properties?.feet.toLocaleString()} ft / ${landmark.feature.properties?.meters.toLocaleString()} m`}
          </Text>
        );

        return (
          <Card
            containerStyle={styles.cardContainerStyle}
            key={index}
            wrapperStyle={styles.cardWrapperStyle}
          >
            <Card.Image
              source={getFeaturePhoto(landmark.feature.properties?.name)}
              style={styles.cardImageStyle}
            >
              <Text style={styles.cardImageTextStyle}>
                {landmark.feature.properties?.name}
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
                  {landmark.checkInsLastWeek}
                </Text>
              </View>
            </View>
          </Card>
        );
      })}
    </View>
  );
};

export default PopularLandmarks;

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
