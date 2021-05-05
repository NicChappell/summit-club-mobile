import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { Point } from "geojson";
import { customMapStyle } from "../../../common/constants";
import { colors } from "../../../common/styles";
import { IStaticMapBackground } from "./types";

const StaticMapBackground = ({
  containerStyles,
  feature,
  overlay,
}: IStaticMapBackground) => {
  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng>();
  const [region, setRegion] = useState<Region>();

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
    <View pointerEvents={"none"} style={containerStyles}>
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
        {overlay}
      </MapView>
    </View>
  );
};

export default StaticMapBackground;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
