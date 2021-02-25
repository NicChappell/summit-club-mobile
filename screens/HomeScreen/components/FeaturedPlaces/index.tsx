import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import { cardContainer, colors, shadow } from "../../../../common/styles";
import * as actions from "../../../../redux/actions";
import { Places, IFeaturedPlaces } from "../../../../services";
import { getFeaturePhoto } from "../../helpers";

type Props = PropsFromRedux;

const FeaturedPlaces = ({ setError }: Props) => {
  // state hooks
  const [featuredPlaces, setFeaturedPlaces] = useState<
    IFeaturedPlaces[] | undefined
  >(undefined);

  // effect hooks
  useEffect(() => {
    Places.getFeaturedPlaces()
      .then((featuredPlaces) => {
        setFeaturedPlaces(featuredPlaces);
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
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        data={featuredPlaces}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => console.log("TODO: HANDLE PRESS")}
          >
            <Card
              containerStyle={styles.cardContainerStyle}
              wrapperStyle={styles.cardWrapperStyle}
            >
              <Card.Image
                source={getFeaturePhoto(item.name)}
                style={styles.cardImageStyle}
              >
                <View style={styles.cardImageViewStyle}>
                  <Text style={styles.cardImageTextStyle}>{item.name}</Text>
                </View>
              </Card.Image>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FeaturedPlaces);

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...cardContainer,
    ...shadow,
    height: 124,
    margin: 2,
    width: 124,
  },
  cardImageStyle: {
    alignItems: "flex-end",
    borderRadius: 4,
    borderWidth: 0,
    height: "100%",
    justifyContent: "flex-end",
    width: "100%",
  },
  cardImageTextStyle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
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
  cardImageViewStyle: {
    backgroundColor: colors.black50,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  cardWrapperStyle: {},
  container: { marginTop: 24 },
  separator: {
    width: 16,
  },
  slideStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
});
