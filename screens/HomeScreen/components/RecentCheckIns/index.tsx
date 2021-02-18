import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
} from "@expo-google-fonts/nunito-sans";
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

  // font hooks
  useFonts({ NunitoSans_400Regular, NunitoSans_600SemiBold });

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={data}
      renderItem={({ item }) => (
        <Card
          containerStyle={styles.cardContainerStyle}
          wrapperStyle={styles.cardWrapperStyle}
        >
          <Image
            source={{ uri: "https://picsum.photos/512" }}
            style={styles.featureImage}
          />
          <View style={styles.checkInDetails}>
            <Text style={styles.userName}>
              {`${item.user.firstName} ${item.user.lastName}`}
            </Text>
            <Text style={styles.featureName}>
              {item.feature.properties?.name}
            </Text>
            <Text style={styles.featureHierarchy}>
                {item.feature.properties?.regions.length
                  ? `${item.feature.properties?.regions[0]}, `
                  : null}
                {item.feature.properties?.states.length
                  ? `${item.feature.properties?.states[0]}`
                  : null}
              </Text>
            <Text style={styles.featureHierarchy}>
                {item.feature.properties?.countries.length
                  ? `${item.feature.properties?.countries[0]}, `
                  : null}
                {item.feature.properties?.continent
                  ? item.feature.properties?.continent
                  : null}
              </Text>
            <Text style={styles.featureElevation}>
              {`${item.feature.properties?.feet.toLocaleString()} ft / ${item.feature.properties?.meters.toLocaleString()} m`}
            </Text>
            <Text style={styles.featureCoordinate}>
              {`${item.feature.properties?.latitude}° ${
                item.feature.properties?.latitude >= 0 ? "N" : "S"
              }, ${item.feature.properties?.longitude}° ${
                item.feature.properties?.longitude >= 0 ? "E" : "W"
              }`}
            </Text>
          </View>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...cardContainer,
    ...shadow,
    alignSelf: "stretch",
    height: 128,
    margin: 2,
  },
  cardWrapperStyle: {
    flexDirection: "row",
  },
  checkInDetails: {
    alignSelf: "stretch",
    padding: 8,
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
  separator: {
    height: 16,
  },
  userName: {
    color: colors.black,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
  },
});

export default RecentCheckIns;
