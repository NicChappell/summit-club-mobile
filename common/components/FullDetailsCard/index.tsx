import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  marginReset,
  paddingReset,
  shadow,
} from "../../../common/styles";
import * as actions from "../../../redux/actions";
import { Summit, IPopularSummit } from "../../../services";
import { getFeaturePhoto } from "../../helpers";
import { IPopularSummits } from "./interfaces";

type Props = PropsFromRedux & IPopularSummits;

const FullDetailsCard = ({ navigation, setError }: Props) => {
  // state hooks
  const [popularSummits, setPopularSummits] = useState<
    IPopularSummit[] | undefined
  >(undefined);

  // effect hooks
  useEffect(() => {
    Summit.getPopularSummits()
      .then((popularSummits) => {
        setPopularSummits(popularSummits);
      })
      .catch((error) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      {popularSummits?.map((summit) => {
        const countyState =
          summit.feature.properties?.county &&
          summit.feature.properties?.state ? (
            <Text style={styles.featureHierarchy}>
              {`${summit.feature.properties?.county} County, ${summit.feature.properties?.state}`}
            </Text>
          ) : null;

        const countryContinent =
          summit.feature.properties?.country &&
          summit.feature.properties?.continent ? (
            <Text style={styles.featureHierarchy}>
              {`${summit.feature.properties?.country}, ${summit.feature.properties?.continent}`}
            </Text>
          ) : null;

        const coordinate = (
          <Text style={styles.featureCoordinate}>
            {`${summit.feature.properties?.latitude}° ${
              summit.feature.properties?.latitude >= 0 ? "N" : "S"
            }, ${summit.feature.properties?.longitude}° ${
              summit.feature.properties?.longitude >= 0 ? "E" : "W"
            }`}
          </Text>
        );

        const elevation = (
          <Text style={styles.featureElevation}>
            {`${summit.feature.properties?.feet.toLocaleString()} ft / ${summit.feature.properties?.meters.toLocaleString()} m`}
          </Text>
        );

        return (
          <TouchableOpacity
            key={summit.id}
            onPress={() =>
              navigation.navigate("Feature", {
                id: summit.feature.properties?.id,
                name: summit.feature.properties?.name,
              })
            }
          >
            <Card
              containerStyle={styles.cardContainerStyle}
              wrapperStyle={styles.cardWrapperStyle}
            >
              <Card.Image
                source={getFeaturePhoto(summit.feature.properties?.name)}
                style={styles.cardImageStyle}
              >
                <Text style={styles.cardImageTextStyle}>
                  {summit.feature.properties?.name}
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
                    {summit.checkInsLastWeek}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FullDetailsCard);

const styles = StyleSheet.create({
  container: {},
  cardContainerStyle: {
    ...marginReset,
    ...paddingReset,
    alignSelf: "stretch",
    marginTop: 24,
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
  cardWrapperStyle: {
    ...borderRadius4,
    ...borderWidthReset,
    ...shadow,
  },
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
