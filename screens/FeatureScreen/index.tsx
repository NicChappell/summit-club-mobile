import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import { Point } from "geojson";
import { colors } from "../../common/styles";
import { Camera, LatLng, Region } from "../../common/types";
import { MapContext } from "../../contexts";
import { processFeature } from "./helpers";
import { IFeatureScreen } from "./interfaces";

const initRegion: Region = {
  latitude: 39.113014,
  longitude: -105.358887,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

const FeatureScreen = ({ navigation, route }: IFeatureScreen) => {
  // destructure route params
  const { slug } = route.params;

  // context hooks
  const { database, feature, setFeature } = useContext(MapContext);

  // state hooks
  const [markerCoordinate, setMarkerCoordinate] = useState<LatLng | undefined>(
    undefined
  );

  // ref hooks
  const mapRef: React.MutableRefObject<MapView | null> = useRef(null);

  useEffect(() => {
    if (database) {
      // new database transaction
      database.transaction((tx) => {
        // execute sql statement
        tx.executeSql(
          `SELECT * FROM fourteeners WHERE slug = '${slug}';`,
          [],
          (_: SQLite.SQLTransaction, ResultSet: SQLite.SQLResultSet) => {
            // convert ResultSet into GeoJSON Feature
            const feature = processFeature(ResultSet);

            // update state
            setFeature(feature);
          }
        );
      });
    }
  }, [slug]);

  useEffect(() => {
    if (feature) {
      // destructure feature
      const geometry = feature.geometry;

      // destructure geometry
      const coordinates = (geometry as Point).coordinates;

      // format marker coordinate param
      const coordinate: LatLng = {
        latitude: coordinates[1],
        longitude: coordinates[0],
      };

      // destructure mapRef
      const MapView = mapRef.current;

      // create new camera view
      const camera: Camera = {
        center: coordinate,
        zoom: 11,
      };

      // TODO: WHY ISN'T THIS WORKING!?!?!?!?!?!?!?!?
      // animate the camera to a new view
      MapView?.animateCamera(camera, { duration: 500 });

      // update state
      setMarkerCoordinate(coordinate);
    }
  }, [feature]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={"google"}
          ref={mapRef}
          region={initRegion}
          style={styles.map}
        >
          {markerCoordinate && <Marker coordinate={markerCoordinate} />}
        </MapView>
      </View>
      <Text>This is top text.</Text>
      <Text>FeatureScreen</Text>
      <Text>{slug}</Text>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

export default FeatureScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.pistachio,
    flex: 1,
    justifyContent: "flex-start",
  },
  mapContainer: {
    backgroundColor: colors.orangeRed,
    width: "100%",
    height: "50%",
  },
  map: {
    flex: 1,
  },
});
