import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, ButtonGroup, Card } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
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
import { usdCurrencyFormatter } from "../../../common/helpers";
import { ApparelFit, IApparelVersion } from "../../../services";
import { IApparelDetailsCard } from "./interfaces";

const ApparelDetailsCard = ({ item }: IApparelDetailsCard) => {
  // destructure item
  const { description, price, title, type, versions } = item;

  // state hooks
  const [filteredVersions, setFilteredVersions] = useState<IApparelVersion[]>(
    []
  );
  const [selectedFitTypeIndex, setSelectedFitTypeIndex] = useState<number>(0);
  const [fitTypes, setFitTypes] = useState<ApparelFit[]>([]);
  const [spotlight, setSpotlight] = useState<IApparelVersion>(versions[0]);

  // effect hooks
  useEffect(() => {
    // set fit types
    const fitTypes = Array.from(
      new Set(versions.map((version) => version.fit))
    );
    setFitTypes(fitTypes);
  }, []);

  // effect hooks
  useEffect(() => {
    const filteredVersions = versions.filter(
      (version) => version.fit === fitTypes[selectedFitTypeIndex]
    );
    setFilteredVersions(filteredVersions);
  }, [fitTypes]);

  const handleFitTypePress = (selectedFitTypeIndex: number) => {
    const filteredVersions = versions.filter(
      (version) => version.fit === fitTypes[selectedFitTypeIndex]
    );
    setFilteredVersions(filteredVersions);

    setSelectedFitTypeIndex(selectedFitTypeIndex);

    setSpotlight(filteredVersions[0]);
  };

  const handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync("https://www.amazon.com/dp/B08CFJYX42");
  };

  return (
    <Card
      containerStyle={styles.cardContainer}
      wrapperStyle={styles.cardWrapper}
    >
      <View>
        <View style={[styles.section, { backgroundColor: "transparent" }]}>
          <Text style={sectionTitle}>
            {title} {type}
          </Text>
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
              {filteredVersions && (
                <FlatList
                  ItemSeparatorComponent={() => (
                    <View style={{ height: separator.height }} />
                  )}
                  data={filteredVersions}
                  decelerationRate={0}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSpotlight(item)}>
                      <Image
                        style={styles.versionPhoto}
                        source={{
                          uri: item.photo,
                        }}
                      />
                    </TouchableOpacity>
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
            { backgroundColor: "transparent", marginVertical: 16 },
          ]}
        >
          {fitTypes.length === 1 ? (
            <Text style={styles.sectionTitle}>Fit type: {fitTypes[0]}</Text>
          ) : (
            <>
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
            </>
          )}
        </View>
      </View>
      <View style={[styles.row, { backgroundColor: "transparent" }]}>
        <Text style={styles.price}>{usdCurrencyFormatter.format(price)}</Text>
        <Button
          buttonStyle={styles.button}
          onPress={handleOpenWithWebBrowser}
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
    backgroundColor: colors.yellowOrange,
    justifyContent: "center",
    height: 40,
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 18,
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
  price: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
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
    color: colors.queenBlue,
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
    height: 144,
    width: 64,
  },
  versionPhoto: {
    height: 64,
    width: 64,
  },
});
