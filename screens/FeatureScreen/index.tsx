import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import { Point } from "geojson";
import { ErrorOverlay, StaticMapBackground } from "../../common/components";
import { customMapStyle } from "../../common/constants";
import { getFeaturePhoto } from "../../common/helpers";
import {
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
} from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { IFeatureScreen } from "./interfaces";

type Props = PropsFromRedux & IFeatureScreen;

const FeatureScreen = ({
  error,
  features,
  navigation,
  route,
  setError,
}: Props) => {
  // destructure features
  const { feature } = features;

  // state hooks
  const [coordinate, setCoordinate] = useState<LatLng>();
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);
  const [region, setRegion] = useState<Region>();

  useEffect(() => {
    if (feature) {
      // destructure feature
      const { geometry, properties } = feature;

      // update navigation options
      navigation.setOptions({ title: properties.name });

      // retreive feature photo if available
      const featurePhoto = getFeaturePhoto(properties.name);

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
      setFeaturePhoto(featurePhoto);
      setRegion(region);
    }
  }, [feature]);

  const handleCheckInPress = () => {
    // navigate to Check In screen
    navigation.navigate("CheckIn");
  };

  return (
    <ScrollView style={styles.scrollView}>
      <ErrorOverlay error={error} />
      <View style={styles.container}>
        {featurePhoto ? (
          // render feature photo if available
          <View style={styles.featurePhotoContainer}>
            <Image source={featurePhoto} style={styles.featurePhoto} />
          </View>
        ) : (
          // render static map by default
          <StaticMapBackground
            containerStyles={{ height: 256 }}
            feature={feature}
          />
        )}
        <View style={styles.featureDetails}>
          <View style={styles.header}>
            <Text style={featureName}>{feature.properties?.name}</Text>
            <Text style={featureElevation}>
              {feature.properties?.feet.toLocaleString()} ft
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={featureLocation}>
              {feature.properties?.county} County, {feature.properties?.state}
            </Text>
            <Text style={featureCoordinate}>
              {feature.properties?.latitude.toFixed(3)}°{" "}
              {feature.properties?.latitude > 0 ? "N" : "S"},{" "}
              {feature.properties?.longitude.toFixed(3)}°{" "}
              {feature.properties?.longitude > 0 ? "E" : "W"}
            </Text>
          </View>
          <View style={styles.footer}>
            <Button
              disabledStyle={styles.button}
              disabled={true}
              title="Explore"
              disabledTitleStyle={styles.buttonTitle}
            />
          </View>
        </View>
        <Button title="Check in" onPress={handleCheckInPress} />
        <View pointerEvents={"none"} style={styles.mapContainer}>
          {coordinate && region && (
            <MapView
              customMapStyle={customMapStyle}
              provider={"google"}
              region={region}
              style={styles.map}
            >
              <Circle
                center={coordinate}
                fillColor={colors.queenBlue50}
                radius={500}
                strokeColor={colors.queenBlue}
                strokeWidth={2.5}
              />
            </MapView>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
    features: state.features,
  };
};

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FeatureScreen);

const styles = StyleSheet.create({
  body: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  button: {
    backgroundColor: colors.zomp,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 14,
  },
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "flex-start",
  },
  featureDetails: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 8,
  },
  featurePhoto: {
    height: "100%",
    width: "100%",
  },
  featurePhotoContainer: {
    height: 256,
    width: "100%",
  },
  footer: {
    alignItems: "baseline",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "baseline",
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mapContainer: {
    height: 256,
    width: "100%",
  },
  map: {
    height: "100%",
    width: "100%",
  },
  scrollView: {
    backgroundColor: colors.black01,
  },
});
