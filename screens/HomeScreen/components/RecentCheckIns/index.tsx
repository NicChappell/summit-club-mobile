import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { cardContainer, colors, shadow } from "../../../../common/styles";
import { ICheckIn } from "./interfaces";

import { MockFeature } from "../../../../data/mocks/features";
import { MockUser } from "../../../../data/mocks/users";
const DATA: ICheckIn[] = [
  { id: "0", user: MockUser, feature: MockFeature, date: new Date() },
  { id: "1", user: MockUser, feature: MockFeature, date: new Date() },
  { id: "2", user: MockUser, feature: MockFeature, date: new Date() },
];

const RecentCheckIns = () => {
  // state hooks
  const [data, setData] = useState<ICheckIn[] | undefined>(undefined);

  // effect hooks
  useEffect(() => {
    setData(DATA);
  }, []);

  return (
    <View style={styles.container}>
      {data?.map((checkIn, index) => {
        const coordinate = (
          <Text style={styles.featureCoordinate}>
            {`${checkIn.feature.properties?.latitude}° ${
              checkIn.feature.properties?.latitude >= 0 ? "N" : "S"
            }, ${checkIn.feature.properties?.longitude}° ${
              checkIn.feature.properties?.longitude >= 0 ? "E" : "W"
            }`}
          </Text>
        );

        const countyState =
          checkIn.feature.properties?.county &&
          checkIn.feature.properties?.state ? (
            <Text style={styles.featureHierarchy}>
              {`${checkIn.feature.properties?.county} County, ${checkIn.feature.properties?.state}`}
            </Text>
          ) : null;

        const countryContinent =
          checkIn.feature.properties?.country &&
          checkIn.feature.properties?.continent ? (
            <Text style={styles.featureHierarchy}>
              {`${checkIn.feature.properties?.country}, ${checkIn.feature.properties?.continent}`}
            </Text>
          ) : null;

        const elevation = (
          <Text style={styles.featureElevation}>
            {`${checkIn.feature.properties?.feet.toLocaleString()} ft / ${checkIn.feature.properties?.meters.toLocaleString()} m`}
          </Text>
        );

        const featureName = (
          <Text style={styles.featureName}>
            {checkIn.feature.properties?.name}
          </Text>
        );

        const userName = (
          <Text style={styles.userName}>
            {`${checkIn.user.firstName} ${checkIn.user.lastName}`}
          </Text>
        );

        return (
          <Card
            containerStyle={styles.cardContainerStyle}
            key={checkIn.id}
            wrapperStyle={styles.cardWrapperStyle}
          >
            <Image
              source={{ uri: "https://picsum.photos/512" }}
              style={styles.featureImage}
            />
            <View style={styles.checkInDetails}>
              {userName}
              {featureName}
              {countyState}
              {countryContinent}
              {elevation}
              {coordinate}
            </View>
          </Card>
        );
      })}
    </View>
  );
};

export default RecentCheckIns;

const styles = StyleSheet.create({
  container: {},
  cardContainerStyle: {
    ...cardContainer,
    ...shadow,
    alignSelf: "stretch",
    height: 128,
    marginBottom: 32,
    marginHorizontal: 2,
  },
  cardWrapperStyle: {
    flexDirection: "row",
  },
  checkInDetails: {
    alignSelf: "stretch",
    padding: 8,
  },
  even: {
    flexDirection: "row-reverse",
    backgroundColor: "red",
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
  odd: {
    backgroundColor: "blue",
  },
  separator: {
    height: 16,
  },
  userName: {
    color: colors.black,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
  },
});
