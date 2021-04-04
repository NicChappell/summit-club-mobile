import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card } from "react-native-elements";
import { ISummit } from "../../../../../services";
import {
  borderRadius4,
  borderWidthReset,
  colors,
} from "../../../../../common/styles";
import { getFeaturePhoto2 } from "../../../../../common/helpers";
import StaticMapBackground from "../../../StaticMapBackground";
import { IBackground } from "./interfaces";

const Background = ({ item }: IBackground) => {
  // destructure item
  const { feature } = item as ISummit;

  // state hooks
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);

  // effect hooks
  useEffect(() => {
    if (feature) {
      // retreive feature photo if available
      const featurePhoto = getFeaturePhoto2(feature.properties?.name);

      // update state
      setFeaturePhoto(featurePhoto);
    }
  }, []);

  switch (item.type) {
    case "range":
      return (
        <View style={styles.rangeViewStyle}>
          <Text style={styles.rangeTextStyle}>{item.name}</Text>
        </View>
      );
    default:
      if (featurePhoto) {
        return (
          // return feature photo if available
          <Card.Image
            containerStyle={[styles.cardImageContainer, { ...borderRadius4 }]}
            source={featurePhoto}
            style={[
              styles.cardImage,
              { alignItems: "flex-end", justifyContent: "flex-end" },
            ]}
          >
            <View style={styles.cardImageTextView}>
              <Text style={styles.cardImageText}>Test</Text>
            </View>
          </Card.Image>
        );
      } else {
        return (
          // render map by default
          <StaticMapBackground
            containerStyles={{ ...borderRadius4 }}
            feature={feature}
            overlay={
              <View style={styles.overlayContainer}>
                <View style={styles.overlayTextView}>
                  <Text style={styles.overlayText}>Test</Text>
                </View>
              </View>
            }
          />
        );
      }
  }
};

export default Background;

const styles = StyleSheet.create({
  cardImageStyle: {
    ...borderRadius4,
    ...borderWidthReset,
    alignItems: "flex-end",
    height: "100%",
    justifyContent: "flex-end",
    overflow: "hidden",
    width: "100%",
  },

  cardImage: {
    height: "100%",
    width: "100%",
  },
  cardImageContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  cardImageText: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cardImageTextView: {
    backgroundColor: colors.black75,
    borderTopLeftRadius: 4,
  },
  overlayContainer: {
    alignItems: "flex-end",
    height: "100%",
    justifyContent: "flex-end",
    width: "100%",
  },
  overlayText: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  overlayTextView: {
    backgroundColor: colors.black75,
    borderTopLeftRadius: 4,
  },
  rangeTextStyle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 12,
  },
  rangeViewStyle: {
    ...borderRadius4,
    alignItems: "center",
    backgroundColor: colors.zomp,
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});
