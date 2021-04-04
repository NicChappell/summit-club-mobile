import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import { Point } from "geojson";
import { ErrorOverlay } from "../../common/components";
import { customMapStyle } from "../../common/constants";
import { borderWidthReset, colors } from "../../common/styles";
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
  const [coordinate, setCoordinate] = useState<LatLng | undefined>(undefined);
  const [region, setRegion] = useState<Region | undefined>(undefined);

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
    }
  }, [feature]);

  return (
    <ScrollView style={styles.scrollView}>
      <ErrorOverlay error={error} />
      <View style={styles.container}>
        {/* <ImageBackground
          source={getFeaturePhoto(properties?.name)}
          style={styles.featureImageBackground}
        >
          <View style={styles.featureImageBackgroundView}>
            <Text style={styles.featureImageBackgroundText}>
              {properties?.name}
            </Text>
          </View>
        </ImageBackground> */}
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
        {/* <View style={styles.featurePropertiesContainer}>
          <Text style={styles.featureName}>{properties?.name}</Text>
          <Text style={styles.hierarchy}>
            {`${properties?.county} County, ${properties?.state}`}
          </Text>
          <Text style={styles.hierarchy}>
            {`${properties?.country}, ${properties?.continent}`}
          </Text>
          <Text style={styles.elevation}>
            {`${properties?.feet.toLocaleString()} ft / ${properties?.meters.toLocaleString()} m`}
          </Text>
        </View> */}
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
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  elevation: {
    fontFamily: "NunitoSans_400Regular",
  },
  featureImageBackground: {
    ...borderWidthReset,
    alignItems: "flex-end",
    height: 256,
    justifyContent: "flex-end",
    width: "100%",
  },
  featureImageBackgroundText: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featureImageBackgroundView: {
    backgroundColor: colors.black75,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  featureName: {
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 30,
  },
  featurePropertiesContainer: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  hierarchy: {
    fontFamily: "NunitoSans_400Regular",
  },
  mapContainer: {
    width: "100%",
    height: 256,
  },
  map: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
