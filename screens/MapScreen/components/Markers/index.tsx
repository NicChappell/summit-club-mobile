import React from "react";
import { StyleSheet } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { Point } from "geojson";
import { IMarkers } from "../../interfaces";
import { LatLng } from "../../types";
import { CustomCalloutView, CustomMarkerView } from "./components";

const Markers = ({ featureCollection }: IMarkers) => {
  // destructure props
  const { features } = featureCollection!;

  const markers = features.map((feature, index) => {
    // destructure feature
    const geometry = feature.geometry;
    // console.log(geometry);
    const properties = feature.properties;
    // console.log(properties);

    // destructure geometry
    const coordinates = (geometry as Point).coordinates;

    const coordinate: LatLng = {
      latitude: coordinates[1],
      longitude: coordinates[0],
    };

    return (
      <Marker key={index} coordinate={coordinate}>
        <CustomMarkerView />
        <Callout>
          <CustomCalloutView properties={properties} />
        </Callout>
      </Marker>
    );
  });

  return <>{markers}</>;
};

export default Markers;

const styles = StyleSheet.create({});
