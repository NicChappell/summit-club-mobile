import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider } from "react-native-elements";
import MapView, { LatLng, Region } from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Point } from "geojson";
import {
  ApparelDetailsCard,
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
import { IError } from "../../common/types";
import { getFeaturePhoto } from "../../common/helpers";
import {
  borderRadius4,
  colors,
  featureCoordinate,
  featureElevation,
  featureLocation,
  featureName,
  paddingReset,
  sectionTitle,
  separator,
  shadow,
  shadowReset,
} from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  CheckIn,
  IApparel,
  ICheckIn,
  ISummit,
  Merchandise,
  Summit,
} from "../../services";
import { CheckOffOverlay, MarkerView } from "./components";
import { IFeatureScreen } from "./types";

type Props = PropsFromRedux & IFeatureScreen;

const FeatureScreen = ({
  error,
  features,
  navigation,
  route,
  setError,
  setFeature,
}: Props) => {
  // destructure features
  const { feature } = features;

  // state hooks
  const [apparel, setApparel] = useState<IApparel[]>([]);
  const [checkOff, setCheckOff] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<LatLng>(initialCoordinate);
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);
  const [nearbySummits, setNearbySummits] = useState<ISummit[]>([]);
  const [isCheckOffVisible, setIsCheckOffVisible] = useState<boolean>(false);
  const [recentCheckIns, setRecentCheckIns] = useState<ICheckIn[]>([]);
  const [region, setRegion] = useState<Region>(initialRegion);

  // ref hooks
  const scrollViewRef = useRef<ScrollView>(null);

  // effect hooks
  useEffect(() => {
    // fetch recent check-ins
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

    // fetch apparel
    Merchandise.getApparel()
      .then((apparel) => {
        setApparel(apparel);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });

    // fetch nearby summits
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
      // scroll to the top
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });

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

  const handleCheckOffPress = () => {
    // update check-off status
    setCheckOff(!checkOff);

    // render modal
    setIsCheckOffVisible(true);
  };

  const handleSummitPress = (item: ISummit) => {
    // destructure item
    const { feature } = item;

    // update global state
    setFeature(feature);

    // scroll to the top
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const horizontalDetailsCardDimensions = {
    height: 128,
    width: 320,
  };
  const verticalDetailsCardDimensions = {
    height: "auto",
    width: 176,
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.scrollView}>
      <ErrorOverlay error={error} />
      <CheckOffOverlay
        checkOff={checkOff}
        feature={feature}
        visible={isCheckOffVisible}
        setVisible={setIsCheckOffVisible}
      />
      <View style={styles.container}>
        {featurePhoto ? (
          // render feature photo if available
          <View style={styles.featurePhotoContainer}>
            <Image source={featurePhoto} style={styles.featurePhoto} />
          </View>
        ) : (
          // render static map by default
          <StaticMapBackground
            containerStyles={{ height: 256, width: "100%" }}
            feature={feature}
          />
        )}
        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.leftColumn}>
                <Text style={styles.featureName}>
                  {feature.properties?.name}
                </Text>
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
              <View style={styles.rightColumn}>
                <View style={styles.rightColumn}>
                  <Ionicons
                    name={"ios-shield-checkmark-outline"}
                    size={24}
                    color={colors.queenBlue}
                  />
                  <Text style={styles.verified}>Verified{"\n"}check-in</Text>
                </View>
              </View>
            </View>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text style={sectionTitle}>Description</Text>
            <Text style={styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              semper semper diam, porttitor mollis ipsum pharetra vel. Nulla
              blandit eros a diam rhoncus rhoncus vitae ut neque. Sed sagittis,
              odio ac ultricies feugiat, lectus magna interdum risus, non
              feugiat metus ipsum id ligula.
            </Text>
          </View>
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <Text style={sectionTitle}>Location</Text>
            {coordinate && region && (
              <View style={styles.mapContainer}>
                <MapView
                  customMapStyle={customMapStyle}
                  pointerEvents={"none"}
                  provider={"google"}
                  region={region}
                  style={styles.map}
                >
                  <MarkerView />
                </MapView>
              </View>
            )}
          </View>
          <View style={[styles.row, { marginTop: 16 }]}>
            <Button
              buttonStyle={styles.checkInButton}
              onPress={handleCheckInPress}
              title="Check in"
              titleStyle={styles.checkInButtonTitle}
              type="outline"
            />
            <View style={styles.checkOff}>
              {checkOff ? (
                <Text style={styles.paragraph}>Mark incomplete:</Text>
              ) : (
                <Text style={styles.paragraph}>Mark complete:</Text>
              )}
              <Switch
                trackColor={{
                  false: colors.black05,
                  true: colors.pistachio75,
                }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.black05}
                onValueChange={handleCheckOffPress}
                style={styles.switch}
                value={checkOff}
              />
            </View>
          </View>
          {apparel && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text style={sectionTitle}>Apparel</Text>
                <FlatList
                  ItemSeparatorComponent={() => (
                    <View style={{ width: separator.width }} />
                  )}
                  data={apparel}
                  decelerationRate={0}
                  horizontal
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <ApparelDetailsCard item={item} />}
                  showsHorizontalScrollIndicator={false}
                  snapToAlignment={"start"}
                  snapToInterval={256 + separator.width}
                />
              </View>
            </>
          )}
          {recentCheckIns && (
            <>
              <Divider style={styles.divider} />
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
            </>
          )}
          {nearbySummits && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text style={sectionTitle}>Nearby summits</Text>
                <FlatList
                  ItemSeparatorComponent={() => (
                    <View style={{ width: separator.width }} />
                  )}
                  data={nearbySummits}
                  decelerationRate={0}
                  horizontal
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSummitPress(item)}>
                      <VerticalDetailsCard
                        dimensions={{
                          height: verticalDetailsCardDimensions.height,
                          width: verticalDetailsCardDimensions.width,
                        }}
                        item={item}
                      />
                    </TouchableOpacity>
                  )}
                  showsHorizontalScrollIndicator={false}
                  snapToAlignment={"start"}
                  snapToInterval={
                    verticalDetailsCardDimensions.width + separator.width
                  }
                />
              </View>
            </>
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

const mapDispatchToProps = {
  setError: actions.setError,
  setFeature: actions.setFeature,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FeatureScreen);

const styles = StyleSheet.create({
  body: {
    alignItems: "flex-start",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  buttonTitle: {
    color: colors.white,
    fontFamily: "NotoSansJP_500Medium",
    fontSize: 14,
  },
  checkInButton: {
    ...borderRadius4,
    ...paddingReset,
    alignItems: "center",
    backgroundColor: colors.queenBlue,
    justifyContent: "center",
  },
  checkInButtonTitle: {
    color: colors.white,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  checkOff: {
    alignItems: "center",
    flexDirection: "row",
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
    marginBottom: 12,
    marginTop: 24,
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
  leftColumn: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  mapContainer: {
    backgroundColor: colors.black01,
    height: 256,
    width: "100%",
  },
  map: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
  paragraph: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 16,
  },
  rightColumn: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scrollView: {
    backgroundColor: colors.black01,
  },
  section: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  switch: {
    borderColor: colors.queenBlue,
    borderWidth: 2,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginRight: -4,
  },
  verified: {
    color: colors.black,
    fontFamily: "NunitoSans_400Regular",
    fontSize: 12,
  },
});
