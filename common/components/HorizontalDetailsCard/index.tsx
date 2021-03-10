import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { cardContainer, colors, shadow } from "../../../common/styles";
import { MOCK_FEATURE } from "../../../data/mocks/features";

// {
//   type: "Feature",
//   geometry: {
//     type: "Point",
//     coordinates: [-105.6162397, 40.2548614],
//   },
//   properties: {
//     id: 123456789,
//     feet: 14262,
//     meters: 4347,
//     latitude: 40.2548614,
//     longitude: -105.6162397,
//     name: "Longs Peak",
//     class: "Summit",
//     county: "Boulder",
//     state: "CO",
//     country: "United States",
//     continent: "North America",
//   },
// };

const HorizontalDetailsCard = () => {
  const coordinate = (
    <Text style={styles.featureCoordinate}>
      {`${MOCK_FEATURE.properties?.latitude}° ${
        MOCK_FEATURE.properties?.latitude >= 0 ? "N" : "S"
      }, ${MOCK_FEATURE.properties?.longitude}° ${
        MOCK_FEATURE.properties?.longitude >= 0 ? "E" : "W"
      }`}
    </Text>
  );

  const countyState =
    MOCK_FEATURE.properties?.county && MOCK_FEATURE.properties?.state ? (
      <Text style={styles.featureHierarchy}>
        {`${MOCK_FEATURE.properties?.county} County, ${MOCK_FEATURE.properties?.state}`}
      </Text>
    ) : null;

  const countryContinent =
    MOCK_FEATURE.properties?.country && MOCK_FEATURE.properties?.continent ? (
      <Text style={styles.featureHierarchy}>
        {`${MOCK_FEATURE.properties?.country}, ${MOCK_FEATURE.properties?.continent}`}
      </Text>
    ) : null;

  const elevation = (
    <Text style={styles.featureElevation}>
      {`${MOCK_FEATURE.properties?.feet.toLocaleString()} ft / ${MOCK_FEATURE.properties?.meters.toLocaleString()} m`}
    </Text>
  );

  const featureName = (
    <Text style={styles.featureName}>{MOCK_FEATURE.properties?.name}</Text>
  );

  return (
    <Card
      containerStyle={styles.cardContainerStyle}
      wrapperStyle={styles.cardWrapperStyle}
    >
      <Image
        source={{ uri: "https://picsum.photos/512" }}
        style={styles.featureImage}
      />
      <View style={styles.featureDetails}>
        {featureName}
        {countyState}
        {countryContinent}
        {elevation}
        {coordinate}
      </View>
    </Card>
  );
};

export default HorizontalDetailsCard;

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...cardContainer,
    ...shadow,
    alignSelf: "stretch",
    height: 128,
    marginTop: 24,
    marginHorizontal: 2,
  },
  cardWrapperStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureDetails: {
    flex: 1,
    padding: 8,
  },
  featureCoordinate: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
  featureElevation: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
  featureHierarchy: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
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
    fontSize: 12,
  },
});
