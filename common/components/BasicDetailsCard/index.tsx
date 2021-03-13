import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import {
  borderReset,
  cardContainer,
  cardWrapper,
  colors,
  shadow,
  shadowReset,
} from "../../../common/styles";
import * as actions from "../../../redux/actions";
import { Summits, IFeaturedSummit } from "../../../services";
import { getFeaturePhoto } from "../../helpers";
import { IFeaturedSummits } from "./interfaces";

type Props = PropsFromRedux & IFeaturedSummits;

const BasicDetailsCard = ({ navigation, setError }: Props) => {
  // state hooks
  const [featuredSummits, setFeaturedSummits] = useState<
    IFeaturedSummit[] | undefined
  >(undefined);

  // effect hooks
  useEffect(() => {
    Summits.getFeaturedSummits()
      .then((featuredSummits) => {
        setFeaturedSummits(featuredSummits);
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
        data={featuredSummits}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Feature", {
                id: item?.id,
                name: item?.name,
              })
            }
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

export default connector(BasicDetailsCard);

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...borderReset,
    ...cardContainer,
    ...shadowReset,
    alignItems: "flex-end",
    height: 128,
    justifyContent: "flex-start",
    width: 128,
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
    ...shadow,
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardImageViewStyle: {
    backgroundColor: colors.black50,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  cardWrapperStyle: {
    ...cardWrapper,
    ...shadow,
    height: 126,
    width: 126,
  },
  container: {
    alignSelf: "stretch",
    height: 128,
    marginTop: 24,
  },
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
