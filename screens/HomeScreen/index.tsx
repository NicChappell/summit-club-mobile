import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Divider } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import {
  DismissKeyboard,
  ErrorOverlay,
  FullDetailsCard,
  HorizontalDetailsCard,
  VerticalDetailsCard,
} from "../../common/components";
import { IError } from "../../common/types";
import { colors, divider, sectionTitle, separator } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  CheckIn,
  ICheckInRecord,
  ISummit,
  IPopularSummit,
  Summit,
} from "../../services";
import { IHomeScreen } from "./types";

type Props = PropsFromRedux & IHomeScreen;

const HomeScreen = ({
  error,
  navigation,
  route,
  setError,
  setFeature,
}: Props) => {
  // state hooks
  const [checkInRecords, setCheckInRecords] = useState<ICheckInRecord[]>([]);
  const [featuredSummits, setFeaturedSummits] = useState<ISummit[]>([]);
  const [popularSummits, setPopularSummits] = useState<IPopularSummit[]>([]);

  // effect hooks
  useEffect(() => {
    CheckIn.selectAll()
      .then((resultSet) => {
        // destructure result set
        const { _array: checkInRecords }: any = resultSet.rows;

        // update local state
        setCheckInRecords(checkInRecords);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });

    Summit.getFeaturedSummits()
      .then((featuredSummits) => {
        setFeaturedSummits(featuredSummits);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });

    Summit.getPopularSummits()
      .then((popularSummits) => {
        setPopularSummits(popularSummits);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, []);

  useEffect(() => {
    // add event listener
    const didFocus = navigation.addListener("focus", (payload) => {
      // do something
      console.log("focus", payload);
      console.log("fetch latest check-ins?");

      // fetch recent check-ins
      CheckIn.selectAll()
        .then((resultSet) => {
          // destructure result set
          const { _array: recentCheckIns }: any = resultSet.rows;

          // update local state
          // setRecentCheckIns(recentCheckIns);
          console.log(recentCheckIns.length);
        })
        .catch((error: IError) => {
          setError({
            code: error.code,
            message: error.message,
          });
        });
    });

    // cleanup
    return didFocus;
  }, [navigation]);

  const handleSummitPress = (item: ISummit) => {
    // destructure item
    const { feature } = item;

    // update global state
    setFeature(feature);

    // navigate to Feature screen
    navigation.navigate("Feature", { screen: "Feature" });
  };

  const horizontalDetailsCardDimensions = {
    height: 128,
    width: 320,
  };
  const fullDetailsCardDimensions = {
    height: 256,
    width: 288,
  };
  const verticalDetailsCardDimensions = {
    height: "auto",
    width: 176,
  };

  return (
    <DismissKeyboard>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <ErrorOverlay error={error} />
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={sectionTitle}>Featured summits</Text>
            <FlatList
              ItemSeparatorComponent={() => (
                <View style={{ width: separator.width }} />
              )}
              data={featuredSummits}
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
          <Divider style={divider} />
          <View style={styles.section}>
            <Text style={sectionTitle}>Recent check-ins</Text>
            {/* <FlatList
              ItemSeparatorComponent={() => (
                <View style={{ width: separator.width }} />
              )}
              data={checkInRecords}
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
            /> */}
          </View>
          <Divider style={divider} />
          <View style={styles.section}>
            <Text style={sectionTitle}>Popular summits</Text>
            <FlatList
              ItemSeparatorComponent={() => (
                <View style={{ width: separator.width }} />
              )}
              data={popularSummits}
              decelerationRate={0}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSummitPress(item)}>
                  <FullDetailsCard
                    dimensions={{
                      height: fullDetailsCardDimensions.height,
                      width: fullDetailsCardDimensions.width,
                    }}
                    item={item}
                  />
                </TouchableOpacity>
              )}
              showsHorizontalScrollIndicator={false}
              snapToAlignment={"start"}
              snapToInterval={fullDetailsCardDimensions.width + separator.width}
            />
          </View>
        </View>
      </ScrollView>
    </DismissKeyboard>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
  };
};

const mapDispatchToProps = {
  setError: actions.setError,
  setFeature: actions.setFeature,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomeScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "flex-start",
    padding: 8,
  },
  scrollView: {
    backgroundColor: colors.black01,
  },
  section: {
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});
