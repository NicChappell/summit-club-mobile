import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import {
  borderRadius4,
  borderReset,
  colors,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../../common/styles";
import { getFeaturePhoto } from "../../helpers";
import { defaultDimensions } from "./constants";
import { IBasicDetailsCard } from "./interfaces";

const BasicDetailsCard = ({
  dimensions = defaultDimensions,
  item,
  navigation,
}: IBasicDetailsCard) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Feature", {
          id: 1,
          name: "Test",
        })
      }
    >
      <Card
        containerStyle={[styles.cardContainerStyle, { ...dimensions }]}
        wrapperStyle={styles.cardWrapperStyle}
      >
        <Card.Image
          source={getFeaturePhoto("Test")}
          style={styles.cardImageStyle}
        >
          <View style={styles.cardImageViewStyle}>
            <Text style={styles.cardImageTextStyle}>Test</Text>
          </View>
        </Card.Image>
      </Card>
    </TouchableOpacity>
  );
};

export default BasicDetailsCard;

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...borderReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    paddingBottom: 2,
    paddingLeft: 2,
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
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    height: "100%",
    width: "100%",
  },
});
