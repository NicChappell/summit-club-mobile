import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StaticMapBackground } from "../../../../common/components";
import { getFeaturePhoto2 } from "../../../../common/helpers";
import {
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
} from "../../../../common/styles";
import { ISummitDetailsListItem } from "./interfaces";

const SummitDetailsListItem = ({ item }: ISummitDetailsListItem) => {
  // destructure item
  const { checkIns, checkOff, feature, id } = item;

  // state hooks
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);

  // effect hooks
  useEffect(() => {
    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto2(feature.properties?.name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, [feature]);

  return (
    <ListItem bottomDivider key={id}>
      {featurePhoto ? (
        // render feature photo if available
        <View
          style={[
            styles.listItemImageContainer,
            {
              borderRadius: 4,
              height: 80,
              width: 80,
            },
          ]}
        >
          <Image source={featurePhoto} style={styles.listItemImage} />
        </View>
      ) : (
        // render map by default
        <StaticMapBackground
          containerStyles={{
            borderRadius: 4,
            height: 80,
            width: 80,
          }}
          feature={feature}
        />
      )}
      <ListItem.Content>
        <View style={styles.row}>
          <View style={styles.leftColumn}>
            <Text style={featureName}>{feature.properties?.name}</Text>
            <Text style={featureLocation}>
              {feature.properties?.county} County, {feature.properties?.state}
            </Text>
            <Text style={featureCoordinate}>
              {feature.properties?.latitude.toFixed(3)}°{" "}
              {feature.properties?.latitude > 0 ? "N" : "S"},{" "}
              {feature.properties?.longitude.toFixed(3)}°{" "}
              {feature.properties?.longitude > 0 ? "E" : "W"}
            </Text>
          </View>
          {checkIns?.length ? (
            <View style={styles.rightColumn}>
              <Ionicons
                name={"ios-shield-checkmark-outline"}
                size={24}
                color={colors.queenBlue}
              />
              <Text style={styles.verified}>Verified</Text>
            </View>
          ) : null}
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default SummitDetailsListItem;

const styles = StyleSheet.create({
  listItemImage: {
    height: "100%",
    width: "100%",
  },
  listItemImageContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  leftColumn: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  rightColumn: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  verified: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
});
