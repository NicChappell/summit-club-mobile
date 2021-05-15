import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { getFeaturePhoto } from "../../helpers";
import {
  colors,
  featureCoordinate,
  featureLocation,
  featureName,
} from "../../styles";
import StaticMapBackground from "../StaticMapBackground";
import { ISearchResultsListItem } from "./types";

const SearchResultsListItem = ({ item: feature }: ISearchResultsListItem) => {
  // state hooks
  const [featurePhoto, setFeaturePhoto] = useState<any>();

  // effect hooks
  useEffect(() => {
    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto(feature.properties?.name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, []);

  return (
    <ListItem bottomDivider>
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
        // render static map by default
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
            <Text style={featureName}>{feature?.properties?.name}</Text>
            <Text style={featureLocation}>
              {feature?.properties?.feet.toLocaleString()} ft ·{" "}
              {feature?.properties?.county} County
            </Text>
            <Text style={featureCoordinate}>
              {feature?.properties?.latitude.toFixed(3)}°{" "}
              {feature?.properties?.latitude > 0 ? "N" : "S"},{" "}
              {feature?.properties?.longitude.toFixed(3)}°{" "}
              {feature?.properties?.longitude > 0 ? "E" : "W"}
            </Text>
          </View>
        </View>
      </ListItem.Content>
    </ListItem>
  );
};

export default SearchResultsListItem;

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
