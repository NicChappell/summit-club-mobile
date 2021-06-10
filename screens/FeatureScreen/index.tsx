import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Divider, ListItem } from "react-native-elements";
import MapView, { LatLng, Region } from "react-native-maps";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Point } from "geojson";
import firebase from "firebase/app";
import {
  ApparelDetailsCard,
  ErrorOverlay,
  StaticMapBackground,
  VerticalDetailsCard,
} from "../../common/components";
import {
  customMapStyle,
  initialCoordinate,
  initialRegion,
} from "../../common/constants";
import { IError } from "../../common/types";
import { getFeaturePhoto, randomColor, randomInt } from "../../common/helpers";
import {
  borderRadius4,
  colors,
  divider,
  featureCoordinate,
  featureLocation,
  featureName,
  listItem,
  listItemBorderTop,
  listItemContainer,
  listItemContent,
  listItemTitle,
  listItemSubtitle,
  paddingReset,
  paragraph,
  sectionTitle,
  separator,
} from "../../common/styles";
import * as actions from "../../redux/actions";
import {
  IErrorState,
  IFeaturesState,
  IUserState,
  RootState,
} from "../../redux/reducers";
import {
  CheckIn,
  CheckOff,
  IApparel,
  ICheckInRecord,
  ICheckOffDocument,
  ICheckOffRecord,
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
  user,
}: Props) => {
  // destructure features
  const feature = features.feature;

  // destructure feature
  const geometry = feature?.geometry;
  const properties = feature?.properties;

  // destructure geometry
  const coordinates = (geometry as Point)?.coordinates;

  // format feature coordinates
  const featureCoordinates: LatLng = {
    latitude: coordinates[1],
    longitude: coordinates[0],
  };

  // destructure properties
  const featureId = String(properties?.id);
  const featureName = properties?.name;

  // destructure user
  const userId = user.id;

  // state hooks
  const [apparel, setApparel] = useState<IApparel[]>([]);
  const [checkInRecords, setCheckInRecords] = useState<ICheckInRecord[]>([]);
  const [checkOffDocument, setCheckOffDocument] = useState<ICheckOffDocument>();
  const [checkOffRecord, setCheckOffRecord] = useState<ICheckOffRecord>();
  const [checkedOff, setCheckedOff] = useState<boolean>(false);
  const [coordinate, setCoordinate] = useState<LatLng>(initialCoordinate);
  const [featurePhoto, setFeaturePhoto] = useState<any | null>(null);
  const [nearbySummits, setNearbySummits] = useState<ISummit[]>([]);
  const [isCheckOffLoading, setIsCheckOffLoading] = useState<boolean>(false);
  const [isCheckOffVisible, setIsCheckOffVisible] = useState<boolean>(false);
  const [recentCheckIns, setRecentCheckIns] = useState<ICheckInRecord[]>([]);
  const [region, setRegion] = useState<Region>(initialRegion);

  // ref hooks
  const scrollViewRef = useRef<ScrollView>(null);

  // effect hooks
  useEffect(() => {
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

      // reset state
      setCheckOffDocument(undefined);
      setCheckOffRecord(undefined);
      setCheckedOff(false);
      setCoordinate(initialCoordinate);
      setFeaturePhoto(null);
      setIsCheckOffLoading(false);
      setIsCheckOffVisible(false);
      setRegion(initialRegion);

      // update navigation options
      navigation.setOptions({ title: featureName });

      // retreive feature photo if available
      const featurePhoto = getFeaturePhoto(featureName);

      // format marker coordinate
      const coordinate: LatLng = {
        latitude: featureCoordinates.latitude,
        longitude: featureCoordinates.longitude,
      };

      // format map region
      const region: Region = {
        latitude: featureCoordinates.latitude,
        longitude: featureCoordinates.longitude,
        latitudeDelta: 0.075,
        longitudeDelta: 0.075,
      };

      // fetch recent check-ins
      CheckIn.selectWhere({ feature_id: featureId })
        .then((resultSet) => {
          // destructure result set
          const { _array: recentCheckIns }: any = resultSet.rows;

          // update local state
          setRecentCheckIns(recentCheckIns);
        })
        .catch((error: IError) => {
          setError({
            code: error.code,
            message: error.message,
          });
        });

      // fetch check-off record from database table
      CheckOff.selectWhere({
        user_id: userId,
        feature_id: featureId,
      })
        .then((resultSet) => {
          // destructure result set
          const { _array }: any = resultSet.rows;

          // checked-off if result set has length
          //   Boolean(0) === false
          //   Boolean(1+) === true
          if (Boolean(_array.length)) {
            setCheckOffRecord(_array[0]);
            setCheckedOff(true);
          } else {
            setCheckOffRecord(undefined);
          }
        })
        .catch((error: IError) => {
          setError({
            code: error.code,
            message: error.message,
          });
        });

      // update state
      setCoordinate(coordinate);
      setFeaturePhoto(featurePhoto);
      setRegion(region);
    }
  }, [feature]);

  const handleCheckInPress = () => navigation.navigate("CheckIn");

  const handleCheckOffPress = async () => {
    // start loading animation
    setIsCheckOffLoading(true);

    try {
      if (checkedOff) {
        // update state
        setCheckedOff(false);

        // delete check-off record from database table
        await CheckOff.deleteRecord(String(checkOffDocument?.id));

        // delete check-off document from Firestore collection
        await CheckOff.deleteDocument(String(checkOffDocument?.id));

        // update state
        setCheckOffDocument(undefined);
        setCheckOffRecord(undefined);
        setIsCheckOffVisible(true);
      } else {
        // update state
        setCheckedOff(true);

        // format check-off document payload
        const document = {
          userId,
          featureId,
          createdAt: firebase.firestore.Timestamp.now(),
        };

        // add check-off document to Firestore collection
        const checkOffDocument = await CheckOff.add(document);

        // format check-off record payload
        const checkOffRecord: ICheckOffRecord = {
          id: checkOffDocument.id,
          user_id: checkOffDocument.userId,
          feature_id: checkOffDocument.featureId,
          created_at: checkOffDocument.createdAt.toMillis(),
        };

        // insert check-off record into database table
        await CheckOff.insert(checkOffRecord);

        // update local state
        setCheckOffDocument(checkOffDocument);
        setCheckOffRecord(checkOffRecord);
        setIsCheckOffVisible(true);
      }
    } catch (error) {
      // update global state
      setError({ message: error.message });
    }

    // stop loading animation
    setIsCheckOffLoading(false);
  };

  const handleSummitPress = (item: ISummit) => {
    // destructure item
    const { feature } = item;

    // update global state
    setFeature(feature);

    // scroll to the top
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const timestamp = new Date();

  const verticalDetailsCardDimensions = {
    height: "auto",
    width: 176,
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.scrollView}>
      <ErrorOverlay error={error} />
      <CheckOffOverlay
        checkedOff={checkedOff}
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
                  {feature?.properties?.name}
                </Text>
                <Text style={featureLocation}>
                  {feature?.properties?.feet.toLocaleString()} ft ·{" "}
                  {feature?.properties?.county} County
                </Text>
                <Text style={featureCoordinate}>
                  {feature?.properties?.latitude.toFixed(3)}°{" "}
                  {feature?.properties?.latitude > 0 ? "N" : "S"},{" "}
                  {feature?.properties?.longitude.toFixed(3)}°{" "}
                  {feature?.properties?.longitude > 0 ? "E" : "W"}
                </Text>
              </View>
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
          <Divider style={divider} />
          <View style={styles.section}>
            <Text style={sectionTitle}>Description</Text>
            <Text style={paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              semper semper diam, porttitor mollis ipsum pharetra vel. Nulla
              blandit eros a diam rhoncus rhoncus vitae ut neque. Sed sagittis,
              odio ac ultricies feugiat, lectus magna interdum risus, non
              feugiat metus ipsum id ligula.
            </Text>
          </View>
          <Divider style={divider} />
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
              {isCheckOffLoading ? (
                <ActivityIndicator
                  color={colors.queenBlue}
                  size="small"
                  style={{ marginRight: 4 }}
                />
              ) : checkedOff ? (
                <Text style={paragraph}>Mark incomplete:</Text>
              ) : (
                <Text style={paragraph}>Mark complete:</Text>
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
                value={checkedOff}
              />
            </View>
          </View>
          {apparel && (
            <>
              <Divider style={divider} />
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
          {checkInRecords && (
            <>
              <Divider style={divider} />
              <View style={styles.section}>
                <Text style={sectionTitle}>Recent check-ins</Text>
                <View style={listItemContainer}>
                  {recentCheckIns.slice(0, 5).map((recentCheckIn, index) => (
                    <ListItem
                      containerStyle={
                        index !== 0 ? [listItem, listItemBorderTop] : listItem
                      }
                      key={index}
                    >
                      <Avatar
                        rounded
                        size="small"
                        title="NC"
                        overlayContainerStyle={{
                          backgroundColor: randomColor(),
                        }}
                      />
                      <View style={listItemContent}>
                        <View>
                          <Text style={listItemTitle}>Nic Chappell</Text>
                          <Text style={listItemSubtitle}>
                            {timestamp.toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.counter}>
                            {(index + randomInt(0, 10000)).toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    </ListItem>
                  ))}
                </View>
              </View>
            </>
          )}
          {nearbySummits && (
            <>
              <Divider style={divider} />
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
  // destructure state
  const {
    error,
    features,
    user,
  }: {
    error: IErrorState;
    features: IFeaturesState;
    user: IUserState;
  } = state;

  return {
    error,
    features,
    user,
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
  avatarContainer: {
    backgroundColor: colors.zomp,
  },
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
  counter: {
    color: colors.black,
    fontFamily: "NunitoSans_600SemiBold",
    fontSize: 20,
  },
  featureName: {
    ...featureName,
    fontSize: 24,
    marginBottom: 4,
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
