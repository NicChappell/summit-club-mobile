import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { cardContainer, colors, shadow } from "../../../../common/styles";
import * as actions from "../../../../redux/actions";
import { Summits, IPopularSummits } from "../../../../services";
import { getFeaturePhoto } from "../../helpers";

type Props = PropsFromRedux;

const PopularSummits = ({ setError }: Props) => {
  // state hooks
  const [popularSummits, setPopularSummits] = useState<
    IPopularSummits[] | undefined
  >(undefined);

  // effect hooks
  useEffect(() => {
    Summits.getPopularSummits()
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
      {popularSummits?.map((summit, index) => {
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
          <Card
            containerStyle={styles.cardContainerStyle}
            key={index}
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
        );
      })}
    </View>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PopularSummits);

const styles = StyleSheet.create({
  container: {},
  cardContainerStyle: {
    ...cardContainer,
    ...shadow,
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
