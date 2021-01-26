import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { IMarkers } from "../../interfaces";
import * as MapTypes from "../../types";
import { CustomMarkerView } from "./components";

const Markers = ({ featureCollection }: IMarkers) => {
  // return null until feature colleciton is set
  if (!featureCollection) {
    return null;
  }

  // destructure props
  const { features } = featureCollection;

  return features.map((feature: Feature, index: number) => {
    // destructure feature
    const geometry: Geometry = feature.geometry;
    const properties: GeoJsonProperties = feature.properties;
    console.log(properties);

    const coordinate: MapTypes.LatLng = {
      latitude: parseFloat(geometry.coordinates[1]),
      longitude: parseFloat(geometry.coordinates[0]),
    };

    return (
      <Marker key={index} coordinate={coordinate}>
        <CustomMarkerView />
        <Callout>
          <View>
            <Text>{properties?.mountainPeak}</Text>
            <Text>{properties?.elevationFeet}</Text>
            <Image style={styles.image} source={{ uri: properties?.photo }} />
          </View>
        </Callout>
      </Marker>
    );
  });
};

export default Markers;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
  },
});
