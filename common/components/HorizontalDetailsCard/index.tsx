import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { GeoJsonProperties, Point } from "geojson";
import { getFeaturePhoto2 } from "../../../common/helpers";
import {
  borderRadius4,
  borderWidthReset,
  colors,
  customMapStyle,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../../common/styles";
import { defaultDimensions } from "./constants";
import { IHorizontalDetailsCard } from "./interfaces";

const HorizontalDetailsCard = ({
  dimensions = defaultDimensions,
  feature,
}: IHorizontalDetailsCard) => {
  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng | undefined>(undefined);
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);
  const [properties, setProperties] = useState<GeoJsonProperties | null>(null);
  const [region, setRegion] = useState<Region | undefined>(undefined);

  // effect hooks
  useEffect(() => {
    if (feature) {
      // destructure feature
      const { geometry, properties } = feature;

      // destructure geometry
      const coordinates = (geometry as Point).coordinates;

      // format marker coordinate
      const coordinate: LatLng = {
        latitude: coordinates[1],
        longitude: coordinates[0],
      };

      // format map region
      const region: Region = {
        latitude: coordinates[1],
        longitude: coordinates[0],
        latitudeDelta: 0.075,
        longitudeDelta: 0.075,
      };

      // update state
      setCoordinate(coordinate);
      setProperties(properties);
      setRegion(region);
    }
  }, [feature]);

  useEffect(() => {
    // retreive feature photo if available
    const featurePhoto = getFeaturePhoto2(properties?.name);

    // update state
    setFeaturePhoto(featurePhoto);
  }, [properties]);

  const featureCoordinate = (
    <Text style={styles.featureCoordinate}>
      {`${feature.properties?.latitude.toFixed(3)}° ${
        feature.properties?.latitude >= 0 ? "N" : "S"
      }, ${feature.properties?.longitude.toFixed(3)}° ${
        feature.properties?.longitude >= 0 ? "E" : "W"
      }`}
    </Text>
  );

  const featureCountyState =
    feature.properties?.county && feature.properties?.state ? (
      <Text style={styles.featureHierarchy}>
        {`${feature.properties?.county} County, ${feature.properties?.state}`}
      </Text>
    ) : null;

  const featureCountryContinent =
    feature.properties?.country && feature.properties?.continent ? (
      <Text style={styles.featureHierarchy}>
        {`${feature.properties?.country}, ${feature.properties?.continent}`}
      </Text>
    ) : null;

  const featureElevation = (
    <Text style={styles.featureElevation}>
      {`${feature.properties?.feet.toLocaleString()} ft / ${feature.properties?.meters.toLocaleString()} m`}
    </Text>
  );

  const featureName = (
    <Text style={styles.featureName}>{feature.properties?.name}</Text>
  );

  return (
    <Card
      containerStyle={[styles.cardContainerStyle, { ...dimensions }]}
      wrapperStyle={styles.cardWrapperStyle}
    >
      {featurePhoto ? (
        // render feature photo if available
        <Image source={featurePhoto} style={styles.featurePhoto} />
      ) : (
        // render MapView by default
        <View pointerEvents={"none"} style={styles.mapContainer}>
          <MapView
            customMapStyle={customMapStyle}
            provider={"google"}
            region={region}
            style={styles.map}
          >
            {coordinate && (
              <Circle
                center={coordinate}
                fillColor={colors.queenBlue50}
                radius={500}
                strokeColor={colors.queenBlue}
                strokeWidth={2.5}
              />
            )}
          </MapView>
        </View>
      )}
      <View style={styles.featureDetails}>
        {featureName}
        {featureCountyState}
        {featureCountryContinent}
        {featureElevation}
        {featureCoordinate}
      </View>
    </Card>
  );
};

export default HorizontalDetailsCard;

const styles = StyleSheet.create({
  cardContainerStyle: {
    ...borderWidthReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    backgroundColor: "transparent",
    paddingBottom: 2,
    paddingLeft: 2,
  },
  cardWrapperStyle: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    alignItems: "flex-start",
    backgroundColor: colors.white,
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },
  featureDetails: {
    flex: 1,
    padding: 8,
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
  featurePhoto: {
    alignItems: "flex-end",
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderWidth: 0,
    height: "100%",
    justifyContent: "flex-end",
    width: 128,
  },
  featureName: {
    color: colors.black,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 18,
  },
  mapContainer: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: "100%",
    overflow: "hidden",
    width: 128,
  },
  map: {
    flex: 1,
  },
});
