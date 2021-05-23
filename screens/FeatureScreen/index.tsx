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
import { getFeaturePhoto, randomInt } from "../../common/helpers";
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
  ICheckIn,
  ICheckOffDocument,
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
  // destructure feature
  const feature = features.feature;
  const featureId = feature?.properties?.id;

  // destructure user
  const userId = user.id;
  console.log("userId: ", userId);

  // state hooks
  const [apparel, setApparel] = useState<IApparel[]>([]);
  const [checkOff, setCheckOff] = useState<boolean>(false);
  const [checkOffDocument, setCheckOffDocument] =
    useState<ICheckOffDocument | null>(null);
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
      const {
        geometry,
        properties: { id: featureId, name: featureName },
      } = feature;

      // update navigation options
      navigation.setOptions({ title: featureName });

      // retreive feature photo if available
      const featurePhoto = getFeaturePhoto(featureName);

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

      // fetch user's check-off document from Firestore
      CheckOff.get({ userId: "12345", featureId })
        .then((snapshot) => {
          if (snapshot.empty) {
            setCheckOffDocument(null);
          } else {
            // format check-off document
            const checkOffDocument = {
              ...snapshot.docs[0].data(),
              id: snapshot.docs[0].id,
            };

            // update state
            setCheckOffDocument(checkOffDocument as ICheckOffDocument);
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

  useEffect(() => {
    if (checkOffDocument) {
      // format record payload
      const record = {
        id: checkOffDocument.id,
        user_id: checkOffDocument.userId,
        feature_id: checkOffDocument.featureId,
        created_at: checkOffDocument.createdAt.toMillis(),
      };

      // insert check-off record into check_off table
      CheckOff.insert(record)
        .then((resultSet) => {
          console.log("CheckOff.insert(record): ", resultSet);

          return CheckOff.countRows();
        })
        .then((count) => {
          console.log("CheckOff.countRows(): ", count);

          return CheckOff.selectAll();
        })
        .then((resultSet) => {
          console.log("CheckOff.selectAll(): ", resultSet);
        })
        .catch((error: IError) => {
          setError({
            code: error.code,
            message: error.message,
          });
        });

      // update state
      setCheckOff(true);
    }
  }, [checkOffDocument]);

  const handleCheckInPress = () => navigation.navigate("CheckIn");

  const handleCheckOffPress = async () => {
    try {
      if (Boolean(checkOffDocument)) {
        // delete check-off record from check_off database table
        const resultSet = await CheckOff.delete({ id: checkOffDocument?.id });
        console.log("fuck: ", resultSet);

        // delete from firestore

        // update state
      } else {
        // format document payload
        const addPayload = {
          userId,
          featureId,
          createdAt: firebase.firestore.Timestamp.now(),
        };

        // add check-off document to checkOffs Firestore collection
        const checkOffDocument = await CheckOff.add(addPayload);

        // format record payload
        const record = {
          id: checkOffDocument.id,
          user_id: checkOffDocument.userId,
          feature_id: checkOffDocument.featureId,
          created_at: checkOffDocument.createdAt.toMillis(),
        };

        // insert check-off record into check_off database table
        const resultSet = await CheckOff.insert(record);
        console.log("CheckOff.insert(payload): ", resultSet);

        // update check-off status
        setCheckOff(!checkOff);

        // render check-off modal
        setIsCheckOffVisible(true);
      }
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const handleSummitPress = (item: ISummit) => {
    // destructure item
    const { feature } = item;

    // update global state
    setFeature(feature);

    // scroll to the top
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  };

  const randomColor = () => {
    const colorArray = [
      colors.redSalsa,
      colors.orangeRed,
      colors.yellowOrange,
      colors.maizeCrayola,
      colors.pistachio,
      colors.zomp,
      colors.queenBlue,
    ];

    const index = randomInt(0, colorArray.length);

    return colorArray[index];
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
              {checkOff ? (
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
                value={checkOff}
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
          {recentCheckIns && (
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
