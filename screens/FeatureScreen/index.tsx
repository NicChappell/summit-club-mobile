import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Divider } from "react-native-elements";
import MapView, { Circle, LatLng, Region } from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import { Point } from "geojson";
import {
  ErrorOverlay,
  HorizontalDetailsCard,
  StaticMapBackground,
  VerticalDetailsCard,
} from "../../common/components";
import {
  customMapStyle,
  initialCoordinate,
  initialRegion,
} from "../../common/constants";
import { IError } from "../../common/interfaces";
import { getFeaturePhoto } from "../../common/helpers";
import {
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
  sectionTitle,
  separator,
} from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { CheckIn, ICheckIn, ISummit, Summit } from "../../services";
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
  const [recentCheckIns, setRecentCheckIns] = useState<ICheckIn[]>([]);
  const [coordinate, setCoordinate] = useState<LatLng>(initialCoordinate);
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);
  const [nearbySummits, setNearbySummits] = useState<ISummit[]>([]);
  const [region, setRegion] = useState<Region>(initialRegion);

  // effect hooks
  useEffect(() => {
    CheckIn.getRecentCheckIns()
      .then((recentCheckIns) => {
        setRecentCheckIns(recentCheckIns);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });

    Summit.getNearbySummits()
      .then((nearbySummits) => {
        setNearbySummits(nearbySummits);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, []);

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

  const horizontalDetailsCardDimensions = {
    height: 128,
    width: 320,
  };
  const verticalDetailsCardDimensions = {
    height: 240,
    width: 176,
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
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.featureName}>{feature.properties?.name}</Text>
            <Text style={featureLocation}>
              {feature.properties?.feet.toLocaleString()} ft ·{" "}
              {feature.properties?.county} County
            </Text>
            <Text style={featureCoordinate}>
              {feature.properties?.latitude.toFixed(3)}°{" "}
              {feature.properties?.latitude > 0 ? "N" : "S"},{" "}
              {feature.properties?.longitude.toFixed(3)}°{" "}
              {feature.properties?.longitude > 0 ? "E" : "W"}
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.featureDescription}>
              Last verified check-in: DD-MM-YYYY
            </Text>
            <Text style={styles.featureDescription}>or</Text>
            <Text style={styles.featureDescription}>Mark as complete: Y/N</Text>
            <Text style={styles.featureDescription}>
              if user has verified check-in, show badge and data of last
              check-in. if user has not verified check-in, show component to
              manually mark as complete.
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.featureDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              semper semper diam, porttitor mollis ipsum pharetra vel. Nulla
              blandit eros a diam rhoncus rhoncus vitae ut neque. Sed sagittis,
              odio ac ultricies feugiat, lectus magna interdum risus, non
              feugiat metus ipsum id ligula.
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.featureName}>Location</Text>
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
            <Button
              style={styles.button}
              title="Check in"
              titleStyle={styles.buttonTitle}
              onPress={handleCheckInPress}
            />
          </View>
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.featureName}>Merch</Text>
            <Text style={styles.featureDescription}>
              somewhere include list of merch available if user has perviously
              summited
            </Text>
          </View>
          <Divider style={styles.divider} />
          {recentCheckIns && (
            <View style={styles.section}>
              <Text style={sectionTitle}>Recent check-ins</Text>
              <FlatList
                ItemSeparatorComponent={() => (
                  <View style={{ width: separator.width }} />
                )}
                data={recentCheckIns}
                decelerationRate={0}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <HorizontalDetailsCard
                    dimensions={{
                      height: horizontalDetailsCardDimensions.height,
                      width: horizontalDetailsCardDimensions.width,
                    }}
                    item={item}
                  />
                )}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={"start"}
                snapToInterval={
                  horizontalDetailsCardDimensions.width + separator.width
                }
              />
            </View>
          )}
          <Divider style={styles.divider} />
          <View style={styles.section}>
            {nearbySummits && (
              <View style={styles.section}>
                <Text style={sectionTitle}>Summits nearby</Text>
                <FlatList
                  ItemSeparatorComponent={() => (
                    <View style={{ width: separator.width }} />
                  )}
                  data={nearbySummits}
                  decelerationRate={0}
                  horizontal
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <VerticalDetailsCard
                      dimensions={{
                        height: verticalDetailsCardDimensions.height,
                        width: verticalDetailsCardDimensions.width,
                      }}
                      item={item}
                    />
                  )}
                  showsHorizontalScrollIndicator={false}
                  snapToAlignment={"start"}
                  snapToInterval={
                    verticalDetailsCardDimensions.width + separator.width
                  }
                />
              </View>
            )}
          </View>
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
  content: {
    padding: 8,
  },
  divider: {
    backgroundColor: colors.black05,
    height: 1,
    marginVertical: 20,
  },
  featureDescription: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 14,
  },
  featureName: {
    ...featureName,
    fontSize: 24,
  },
  featurePhoto: {
    height: "100%",
    width: "100%",
  },
  featurePhotoContainer: {
    height: 256,
    overflow: "hidden",
    width: "100%",
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
  section: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});
