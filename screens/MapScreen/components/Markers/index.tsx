import React from "react";
import { StyleSheet } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { Point } from "geojson";
import { IMarkers } from "../../interfaces";
import { LatLng } from "../../types";
import { CustomCalloutView, CustomMarkerView } from "./components";

const Markers = ({ featureCollection, navigation }: IMarkers) => {
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
        <Callout
          onPress={() =>
            navigation.navigate("Feature", { id: properties?.slug })
          }
        >
          <CustomCalloutView properties={properties} />
        </Callout>
      </Marker>
    );
  });

  // TODO: not a fan of this return statement
  //       might make sense to move MapView component
  //       into a child component of the screen component
  //       and move this map function as a child of MapView
  return <>{markers}</>;
};

export default Markers;

const styles = StyleSheet.create({});
