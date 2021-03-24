import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { Point } from "geojson";
import { colors, customMapStyle } from "../../../common/styles";
import { IStaticMapBackground } from "./interfaces";

const StaticMapBackground = ({
  containerStyles,
  feature,
}: IStaticMapBackground) => {
  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng | undefined>(undefined);
  const [region, setRegion] = useState<Region | undefined>(undefined);

  // effect hooks
  useEffect(() => {
    // destructure feature
    const { geometry } = feature;

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
    setRegion(region);
  }, []);

  return (
    <View
      pointerEvents={"none"}
      style={[styles.mapContainer, { ...containerStyles }]}
    >
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
  );
};

export default StaticMapBackground;

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
