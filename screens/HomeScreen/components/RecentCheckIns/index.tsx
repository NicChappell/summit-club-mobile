import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { cardContainer, colors, shadow } from "../../../../common/styles";
import * as actions from "../../../../redux/actions";
import { CheckIn, ICheckIn } from "../../../../services";

type Props = PropsFromRedux;

const RecentCheckIns = ({ setError }: Props) => {
  // state hooks
  const [recentCheckIns, setRecentCheckIns] = useState<ICheckIn[] | undefined>(
    undefined
  );

  // effect hooks
  useEffect(() => {
    CheckIn.getRecentCheckIns()
      .then((recentCheckIns) => {
        setRecentCheckIns(recentCheckIns);
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
      {recentCheckIns?.map((checkIn, index) => {
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

        const isEven = index % 2 === 0;

        return (
          <Card
            containerStyle={styles.cardContainerStyle}
            key={checkIn.id}
            wrapperStyle={[
              isEven ? styles.evenIndexCard : styles.oddIndexCard,
              styles.cardWrapperStyle,
            ]}
          >
            <Image
              source={{ uri: "https://picsum.photos/512" }}
              style={[
                isEven ? styles.evenIndexImage : styles.oddIndexImage,
                styles.featureImage,
              ]}
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

const mapStateToProps = () => ({});

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(RecentCheckIns);

const styles = StyleSheet.create({
  container: {},
  cardContainerStyle: {
    ...cardContainer,
    ...shadow,
    alignSelf: "stretch",
    height: 128,
    marginTop: 24,
    marginHorizontal: 2,
  },
  cardWrapperStyle: {
    justifyContent: "space-between",
  },
  checkInDetails: {
    flex: 1,
    padding: 8,
  },
  evenIndexCard: {
    flexDirection: "row",
  },
  evenIndexImage: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
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
  oddIndexCard: {
    flexDirection: "row-reverse",
  },
  oddIndexImage: {
    borderBottomRightRadius: 4,
    borderTopRightRadius: 4,
  },
  userName: {
    color: colors.black,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
  },
});
