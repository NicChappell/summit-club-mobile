import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Button, Card } from "react-native-elements";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
  marginReset,
  paddingReset,
  separator,
  shadow,
  shadowReset,
} from "../../styles";
import { IApparelVersion } from "../../../services";
import { IApparelDetailsCard } from "./interfaces";

const ApparelDetailsCard = ({ item }: IApparelDetailsCard) => {
  // destructure item
  const { description, price, title, type, versions } = item;
  console.log(versions);

  // state hooks
  const [filteredVersions, setFilteredVersions] = useState<IApparelVersion>(
    versions[0]
  );
  const [spotlight, setSpotlight] = useState<IApparelVersion>(versions[0]);

  // effect hooks
  useEffect(() => {}, []);

  return (
    <Card
      containerStyle={styles.cardContainer}
      wrapperStyle={styles.cardWrapper}
    >
      <View style={styles.row}>
        <View style={styles.spotlightContainer}>
          <Image
            style={styles.spotlight}
            source={{
              uri: spotlight.photo,
            }}
          />
        </View>
        <View style={styles.versionsContainer}>
          {versions && (
            <FlatList
              ItemSeparatorComponent={() => (
                <View style={{ width: separator.width }} />
              )}
              data={versions}
              decelerationRate={0}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Image
                  style={styles.version}
                  source={{
                    uri: item.photo,
                  }}
                />
              )}
              showsHorizontalScrollIndicator={false}
              snapToAlignment={"start"}
              snapToInterval={32 + separator.width}
            />
          )}
        </View>
      </View>
      <View style={styles.row}>
        <Button title="Men" type="solid" />
        <Button title="Women" type="outline" />
        <Button title="Youth" type="outline" />
      </View>
      <View style={styles.row}>
        <View style={styles.details}>
          <Text>{title}</Text>
          <Text>{type} {price}</Text>
        </View>
        <Button title="Shop" type="solid" />
      </View>
    </Card>
  );
};

export default ApparelDetailsCard;

const styles = StyleSheet.create({
  cardContainer: {
    ...borderWidthReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    backgroundColor: "transparent",
    height: 256,
    paddingBottom: 2,
    paddingLeft: 2,
    width: 256,
  },
  cardWrapper: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    alignItems: "stretch",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  column: {},
  details: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  row: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spotlightContainer: {},
  spotlight: {
    height: 128,
    width: 128,
  },
  versionsContainer: {},
  version: {
    height: 32,
    width: 32,
  },
});
