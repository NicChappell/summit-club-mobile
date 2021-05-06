import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, LatLng, Marker, Region } from "react-native-maps";
import { Point } from "geojson";
import { customMapStyle } from "../../../common/constants";
import { colors } from "../../../common/styles";
import { ICalloutMapBackground } from "./types";

const CONTENT_HEIGHT = 112.5;
const CONTENT_WIDTH = 150;

const CalloutMapBackground = ({
  containerStyles,
  feature,
}: ICalloutMapBackground) => {
  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng>();
  const [region, setRegion] = useState<Region>();

  // ref hooks
  const markerRef = useRef<Marker>(null);

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

  useEffect(() => {
    // return early if markerRef is null
    if (!markerRef) return;

    console.log("mrah?");
    markerRef.current?.showCallout();
  }, [markerRef]);

  return (
    <View pointerEvents={"none"} style={containerStyles}>
      <MapView
        customMapStyle={customMapStyle}
        provider={"google"}
        region={region}
        style={styles.map}
      >
        {coordinate && (
          <Marker
            coordinate={coordinate}
            ref={markerRef}
            tracksViewChanges={false}
          >
            <Callout onPress={() => console.log("TODO")}>
              <View style={styles.container}>
                <Text style={styles.text}>TODO</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default CalloutMapBackground;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    height: CONTENT_HEIGHT,
    justifyContent: "center",
    padding: 8,
    width: CONTENT_WIDTH,
  },
  text: {
    color: colors.black,
  },
  map: {
    flex: 1,
  },
});
