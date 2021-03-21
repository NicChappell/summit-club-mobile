import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-elements";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { GeoJsonProperties, Point } from "geojson";
import {
  borderRadius4,
  borderReset,
  colors,
  customMapStyle,
  marginReset,
  paddingReset,
  shadow,
  shadowReset,
} from "../../../common/styles";
import { IHorizontalDetailsCard } from "./interfaces";

// const MOCK_FEATURE: Feature = {
//   type: "Feature",
//   geometry: {
//     type: "Point",
//     coordinates: [-105.6162397, 40.2548614],
//   },
//   properties: {
//     id: 123456789,
//     feet: 14262,
//     meters: 4347,
//     latitude: 40.2548614,
//     longitude: -105.6162397,
//     name: "Longs Peak",
//     class: "Summit",
//     county: "Boulder",
//     state: "CO",
//     country: "United States",
//     continent: "North America",
//   },
// };

const HorizontalDetailsCard = ({ feature }: IHorizontalDetailsCard) => {
  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng | undefined>(undefined);
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

  const featureCoordinate = (
    <Text style={styles.featureCoordinate}>
      {`${feature.properties?.latitude}° ${
        feature.properties?.latitude >= 0 ? "N" : "S"
      }, ${feature.properties?.longitude}° ${
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
      containerStyle={styles.cardContainerStyle}
      wrapperStyle={styles.cardWrapperStyle}
    >
      {Math.random() > 0.5 ? (
        // show feature image if available
        <Image
          source={{ uri: "https://picsum.photos/512" }}
          style={styles.featureImage}
        />
      ) : (
        // otherwise show mapview
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
    ...borderReset,
    ...marginReset,
    ...paddingReset,
    ...shadowReset,
    height: 128,
    paddingBottom: 2,
    paddingLeft: 2,
    marginBottom: 8,
    marginTop: 8,
    width: 384,
  },
  cardWrapperStyle: {
    ...borderRadius4,
    ...marginReset,
    ...paddingReset,
    ...shadow,
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 8,
    marginRight: 8,
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
  featureImage: {
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
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
  mapContainer: {
    height: "100%",
    width: 128,
  },
  map: {
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    flex: 1,
  },
});
