import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { StaticMapBackground } from "../../../../common/components";
import { getFeaturePhoto2 } from "../../../../common/helpers";
import { colors } from "../../../../common/styles";
import { ICheckInListItemDetails } from "./interfaces";

import { MOCK_FEATURE } from "../../../../data/mocks/features";

const CheckInListItemDetails = ({ checkIn }: ICheckInListItemDetails) => {
  // state hooks
  const [feature, setFeature] = useState<
    Feature<Geometry, GeoJsonProperties> | undefined
  >(undefined);
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);

  // effect hooks
  useEffect(() => {
    // TODO: WHAT'S BEST WAY TO GET FEATURE DATA? RETURN FROM FIRESTORE, OR QUERY LOCAL DB?
    // checkIn.featureId --> use to lookup feature
    const feature = MOCK_FEATURE;

    // update state
    setFeature(feature);
  }, []);

  // effect hooks
  useEffect(() => {
    // return early if feature is undefined
    if (!feature) return;

    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto2(feature.properties?.name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, [feature]);

  // return early if feature is undefined
  if (!feature) return null;

  return (
    <ListItem
      bottomDivider
      containerStyle={styles.listItemContainer}
      key={checkIn.id}
    >
      {featurePhoto ? (
        // render feature photo if available
        <View
          style={[
            styles.listItemImageContainer,
            {
              borderRadius: 4,
              height: 96,
              width: 96,
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
            height: 96,
            width: 96,
          }}
          feature={feature}
        />
      )}
      <ListItem.Content>
        <ListItem.Title>{feature.properties?.name}</ListItem.Title>
        <ListItem.Subtitle>{`${feature.properties?.feet.toLocaleString()} ft / ${feature.properties?.meters.toLocaleString()} m`}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron
        name={"ios-chevron-forward"}
        size={28}
        color={colors.queenBlue}
      />
    </ListItem>
  );
};

export default CheckInListItemDetails;

const styles = StyleSheet.create({
  listItemContainer: {},
  listItemImage: {
    height: "100%",
    width: "100%",
  },
  listItemImageContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
});
