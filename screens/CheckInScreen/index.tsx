import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import MapView, {
  Callout,
  Camera,
  Circle,
  EdgePadding,
  LatLng,
  MapEvent,
  Marker,
  Polygon,
  Region,
} from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import { Point } from "geojson";
import { ErrorOverlay } from "../../common/components";
import { customMapStyle } from "../../common/constants";
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
import * as turf from "@turf/turf";
import MarkerIcon from "../../common/icons/marker-15.svg";
import MountainIcon from "../../common/icons/mountain-15.svg";
import { IneligibleOverlay, SuccessOverlay } from "./components";

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
  const [distance, setDistance] = useState<number>(Infinity);
  const [featureCoordinate, setFeatureCoordinate] = useState<LatLng>();
  const [isEligible, setIsEligible] = useState<boolean>(true);
  const [isIneligibleVisible, setIsIneligibleVisible] = useState<boolean>(
    false
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessVisible, setIsSuccessVisible] = useState<boolean>(false);
  const [initialRegion, setInitialRegion] = useState<Region>();
  const [status, setStatus] = useState<string>("");
  const [uncertaintyRadius, setUncertaintyRadius] = useState<number>(0);
  const [userCoordinate, setUserCoordinate] = useState<LatLng>();

  // ref hooks
  const mapRef = useRef<MapView>(null);

  // effect hooks
  useEffect(() => {
    // set initial status
    setStatus("Checking permissions");

    Location.getForegroundPermissionsAsync()
      .then((permissions) => {
        console.log("permissions: ", permissions);

        // update status
        setStatus("Getting current location");

        return Location.getCurrentPositionAsync();
      })
      .then(({ coords }) => {
        console.log("coords: ", coords);

        // update status
        setStatus("Calculating uncertainty");

        // calculate uncertainty radius
        let uncertaintyRadius: number;
        switch (coords.accuracy) {
          // 1 Lowest: Accurate to the nearest three kilometers
          case 1:
            uncertaintyRadius = 3.0;
            break;
          // 2 Low: Accurate to the nearest kilometer
          case 2:
            uncertaintyRadius = 1.0;
            break;
          // 3 Balanced: Accurate to within one hundred meters
          case 3:
            uncertaintyRadius = 0.1;
            break;
          // 4 High: Accurate to within ten meters of the desired target
          case 4:
            uncertaintyRadius = 0.01;
            break;
          // 5 Highest: The best level of accuracy available.
          default:
            uncertaintyRadius = 0;
        }
        setUncertaintyRadius(uncertaintyRadius);

        // update status
        setStatus("Setting current location");

        // format user coordinate
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
      const { geometry } = feature;

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

  useEffect(() => {
    if (featureCoordinate && userCoordinate && mapRef) {
      // update status
      setStatus("Calculating distance");

      // find center point
      const features = turf.points([
        [featureCoordinate.longitude, featureCoordinate.latitude],
        [userCoordinate.longitude, userCoordinate.latitude],
      ]);
      const centerPoint = turf.center(features);

      // from point
      const from = turf.point([
        featureCoordinate.longitude,
        featureCoordinate.latitude,
      ]);

      // to point
      const to = turf.point([
        userCoordinate.longitude,
        userCoordinate.latitude,
      ]);

      // calculate distance between points in degrees
      const distanceDeg = turf.distance(from, to, { units: "degrees" });
      console.log("distanceDeg: ", distanceDeg);

      // calculate map padding
      let mapPadding = 0.0;
      if (distanceDeg < 0.5) {
        mapPadding = 0.25;
      } else if (distanceDeg < 1.0) {
        mapPadding = 0.5;
      } else if (distanceDeg < 2.0) {
        mapPadding = 1.0;
      } else if (distanceDeg < 3.0) {
        mapPadding = 1.5;
      } else if (distanceDeg < 4.0) {
        mapPadding = 2.0;
      } else {
        mapPadding = 3.0;
      }

      // set intial region
      const initialRegion: Region = {
        latitude: centerPoint.geometry.coordinates[1], // center latitude coordinate
        longitude: centerPoint.geometry.coordinates[0], // center longitude coordinate
        latitudeDelta: distanceDeg + mapPadding, // north-to-south distance (measured in degrees) to display on the map
        longitudeDelta: distanceDeg + mapPadding, // east-to-west distance (measured in degrees) to display on the map
      };
      setInitialRegion(initialRegion);

      // calculate distance between points in kilometers
      const distanceKm = turf.distance(from, to, { units: "kilometers" });
      setDistance(distanceKm);

      // evaluate check-in eligibility
      const isEligible = distanceKm < 0.1 + uncertaintyRadius;
      setIsEligible(isEligible);
    }
  }, [featureCoordinate, userCoordinate]);

  const handleCheckInPress = async () => {
    try {
      // TODO: CHECK IN REQUEST
      const response = await Promise.resolve({ code: 201, message: "created" });

      if (response.code === 201) {
        setIsSuccessVisible(true);
      }
    } catch (error) {}
  };

  const handleRegionChange = (region: Region) => {};

  const handleRegionChangeComplete = async (region: Region) => {};

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <IneligibleOverlay
        distance={distance}
        visible={isIneligibleVisible}
        setVisible={setIsIneligibleVisible}
      />
      <SuccessOverlay
        visible={isSuccessVisible}
        setVisible={setIsSuccessVisible}
      />
      {initialRegion ? (
        <>
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
              <Marker coordinate={featureCoordinate} tracksViewChanges={false}>
                <MountainIcon fill={colors.queenBlue} height={32} width={32} />
              </Marker>
            )}
            {userCoordinate && (
              <Marker coordinate={userCoordinate} tracksViewChanges={false}>
                <MarkerIcon fill={colors.queenBlue} height={32} width={32} />
              </Marker>
            )}
          </MapView>
          <View style={styles.checkInContainer}>
            {isEligible ? (
              <Button
                buttonStyle={styles.checkInButton}
                containerStyle={styles.buttonContainer}
                loading={isLoading}
                loadingStyle={styles.loadingButton}
                onPress={handleCheckInPress}
                title="Check in"
                titleStyle={styles.checkInButtonTitle}
                type="outline"
              />
            ) : (
              <Button
                buttonStyle={styles.ineligibleButton}
                containerStyle={styles.buttonContainer}
                loading={isLoading}
                loadingStyle={styles.loadingButton}
                onPress={() => setIsIneligibleVisible(true)}
                title="Check in"
                titleStyle={styles.ineligibleButtonTitle}
                type="outline"
              />
            )}
          </View>
        </>
      ) : (
        <>
          <ActivityIndicator size="large" color={colors.queenBlue} />
          <Text style={styles.status}>{status}</Text>
        </>
      )}
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
  checkInButton: {
    ...borderRadius4,
    ...paddingReset,
    backgroundColor: colors.white,
    borderColor: colors.queenBlue,
    borderWidth: 1,
    height: 44,
    width: 112,
  },
  checkInButtonTitle: {
    color: colors.queenBlue,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 18,
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
  ineligibleButton: {
    ...borderRadius4,
    ...paddingReset,
    backgroundColor: colors.white,
    borderColor: colors.queenBlue25,
    borderWidth: 1,
    height: 44,
    width: 112,
  },
  ineligibleButtonTitle: {
    color: colors.queenBlue25,
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
  status: {
    color: colors.black75,
    margin: 8,
  },
});
