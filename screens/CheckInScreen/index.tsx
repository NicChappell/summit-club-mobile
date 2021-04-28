import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import MapView, {
  Callout,
  Camera,
  Circle,
  LatLng,
  MapEvent,
  Marker,
  Polygon,
  Region,
} from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import { Point } from "geojson";
import { ErrorOverlay } from "../../common/components";
import { customMapStyle, initialRegion } from "../../common/constants";
import {
  borderRadius4,
  colors,
  paddingReset,
  shadow,
  shadowReset,
} from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { ICheckInScreen } from "./interfaces";

import * as Location from "expo-location";
import MarkerIcon from "../../common/icons/marker-15.svg";
import MountainIcon from "../../common/icons/mountain-15.svg";

type Props = PropsFromRedux & ICheckInScreen;

const CheckInScreen = ({
  error,
  features,
  navigation,
  route,
  setError,
}: Props) => {
  // destructure features
  const { feature } = features;

  // state hooks
  const [disabled, setDisabled] = useState<boolean>(true);
  const [featureCoordinate, setFeatureCoordinate] = useState<LatLng>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userCoordinate, setUserCoordinate] = useState<LatLng>();

  // ref hooks
  const mapRef = useRef<MapView>(null);

  // effect hooks
  useEffect(() => {
    Location.getForegroundPermissionsAsync()
      .then((permissions) => {
        console.log(permissions);

        return Location.getCurrentPositionAsync();
      })
      .then(({ coords }) => {
        // Location Accuracy
        // Lowest  1  Accurate to the nearest three kilometers.
        // Low  2  Accurate to the nearest kilometer.
        // Balanced  3  Accurate to within one hundred meters.
        // High  4  Accurate to within ten meters of the desired target.
        // Highest  5  The best level of accuracy available.
        // BestForNavigation  6  The highest possible accuracy that uses additional sensor data to facilitate navigation apps.
        console.log(coords);

        // format marker coordinate
        const coordinate: LatLng = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        // update state
        setUserCoordinate(coordinate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

      // update state
      setFeatureCoordinate(coordinate);
    }
  }, [feature]);

  const handleRegionChange = (region: Region) => {};

  const handleRegionChangeComplete = async (region: Region) => {};

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <MapView
        customMapStyle={customMapStyle}
        initialRegion={initialRegion}
        loadingEnabled={true}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        pitchEnabled={false}
        provider={"google"}
        ref={mapRef}
        style={styles.map}
      >
        {featureCoordinate && (
          <Marker coordinate={featureCoordinate}>
            <MountainIcon fill={colors.queenBlue} height={32} width={32} />
          </Marker>
        )}
        {userCoordinate && (
          <Marker coordinate={userCoordinate}>
            <MarkerIcon fill={colors.queenBlue} height={32} width={32} />
          </Marker>
        )}
      </MapView>
      <View style={styles.checkInContainer}>
        <Button
          buttonStyle={styles.checkInButton}
          containerStyle={styles.buttonContainer}
          disabled={disabled}
          disabledStyle={styles.disabledButton}
          disabledTitleStyle={styles.disabledButtonTitle}
          loading={isLoading}
          loadingStyle={styles.loadingButton}
          onPress={() => console.log("TODO")}
          title="Check in"
          titleStyle={styles.buttonTitle}
          type="outline"
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
    features: state.features,
  };
};

const mapDispatchToProps = {
  setError: actions.setError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CheckInScreen);

const styles = StyleSheet.create({
  buttonContainer: {
    ...borderRadius4,
    backgroundColor: colors.white,
  },
  buttonTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
  },
  checkInButton: {
    ...borderRadius4,
    ...paddingReset,
    backgroundColor: colors.white,
    borderColor: colors.queenBlue,
    borderWidth: 1,
    height: 44,
    width: 112,
  },
  checkInContainer: {
    ...borderRadius4,
    ...shadow,
    bottom: 32,
    position: "absolute",
    zIndex: 1,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.black01,
    flex: 1,
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: colors.white,
    borderColor: colors.queenBlue50,
  },
  disabledButtonTitle: {
    color: colors.queenBlue50,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
  },
  loadingButton: {
    backgroundColor: colors.white,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});
