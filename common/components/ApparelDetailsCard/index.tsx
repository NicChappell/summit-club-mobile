import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Button, ButtonGroup, Card } from "react-native-elements";
import {
  borderRadius4,
  borderRadiusReset,
  borderWidthReset,
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
  marginReset,
  paddingReset,
  sectionTitle,
  separator,
  shadow,
  shadowReset,
} from "../../styles";
import { ApparelFit, IApparelVersion } from "../../../services";
import { IApparelDetailsCard } from "./interfaces";

const ApparelDetailsCard = ({ item }: IApparelDetailsCard) => {
  // destructure item
  const { description, price, title, type, versions } = item;
  console.log(versions);

  // state hooks
  const [filteredVersions, setFilteredVersions] = useState<IApparelVersion>(
    versions[0]
  );
  const [selectedFitTypeIndex, setSelectedFitTypeIndex] = useState<number>(0);
  const [fitTypes, setFitTypes] = useState<ApparelFit[]>([
    "Men",
    "Women",
    "Youth",
  ]);
  const [spotlight, setSpotlight] = useState<IApparelVersion>(versions[0]);

  // effect hooks
  useEffect(() => {}, []);

  const handleFitTypePress = (selectedFitTypeIndex: number) =>
    setSelectedFitTypeIndex(selectedFitTypeIndex);

  return (
    <Card
      containerStyle={styles.cardContainer}
      wrapperStyle={styles.cardWrapper}
    >
      <View style={[styles.section, { backgroundColor: "red" }]}>
        <Text style={sectionTitle}>{type}</Text>
        <View style={styles.row}>
          <View style={styles.spotlightContainer}>
            <Image
              style={styles.spotlightPhoto}
              source={{
                uri: spotlight.photo,
              }}
            />
          </View>
          <View style={styles.versionsContainer}>
            {versions && (
              <FlatList
                ItemSeparatorComponent={() => (
                  <View style={{ height: separator.height }} />
                )}
                data={versions}
                decelerationRate={0}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Image
                    style={styles.versionPhoto}
                    source={{
                      uri: item.photo,
                    }}
                  />
                )}
                showsVerticalScrollIndicator={false}
                snapToAlignment={"start"}
                snapToInterval={64 + separator.height}
              />
            )}
          </View>
        </View>
      </View>
      <View
        style={[
          styles.section,
          { backgroundColor: "green", marginVertical: 16 },
        ]}
      >
        <Text style={styles.sectionTitle}>Fit type:</Text>

        <ButtonGroup
          buttonStyle={styles.buttonGroupButton}
          buttons={fitTypes}
          containerStyle={styles.buttonGroupContainer}
          innerBorderStyle={styles.buttonGroupInnerBorder}
          onPress={handleFitTypePress}
          selectedIndex={selectedFitTypeIndex}
          selectedButtonStyle={styles.buttonGroupSelectedButton}
          selectedTextStyle={styles.buttonGroupSelectedButtonText}
          textStyle={styles.buttonGroupText}
        />
      </View>
      <View style={[styles.row, { backgroundColor: "blue" }]}>
        <View style={styles.details}>
          <Text>{title}</Text>
          <Text>
            {type} {price}
          </Text>
        </View>
        <Button
          buttonStyle={styles.button}
          onPress={() => console.log("TODO")}
          title="Shop"
          titleStyle={styles.buttonTitle}
          type="solid"
        />
      </View>
    </Card>
  );
};

export default ApparelDetailsCard;

const styles = StyleSheet.create({
  button: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.queenBlue,
    justifyContent: "center",
    height: 32,
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 14,
  },
  buttonGroupButton: {
    backgroundColor: colors.white,
  },
  buttonGroupContainer: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    borderColor: colors.queenBlue,
    height: 32,
  },
  buttonGroupInnerBorder: {
    color: colors.queenBlue,
  },
  buttonGroupSelectedButton: {
    backgroundColor: colors.queenBlue,
  },
  buttonGroupSelectedButtonText: {
    color: colors.white,
  },
  buttonGroupText: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 14,
  },
  //
  //
  //
  //
  //
  cardContainer: {
    ...borderWidthReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    backgroundColor: "transparent",
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
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  column: {},
  details: {
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  row: {
    alignItems: "center",
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sectionTitle: {
    ...sectionTitle,
    color: colors.white,
    fontSize: 14,
    marginBottom: 4,
  },
  spotlightContainer: {
    height: 144,
    width: 144,
  },
  spotlightPhoto: {
    height: "100%",
    width: "100%",
  },
  versionsContainer: {
    backgroundColor: "purple",
    height: 144,
    width: 64,
  },
  versionPhoto: {
    height: 64,
    width: 64,
  },
});
