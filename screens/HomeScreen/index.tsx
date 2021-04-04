import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect, ConnectedProps } from "react-redux";
import {
  BasicDetailsCard,
  DismissKeyboard,
  ErrorOverlay,
  FullDetailsCard,
  HorizontalDetailsCard,
} from "../../common/components";
import { IError } from "../../common/interfaces";
import { colors, sectionTitle, separator } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  CheckIn,
  ICheckIn,
  ISummit,
  IPopularSummit,
  Summit,
} from "../../services";
import { IHomeScreen } from "./interfaces";

type Props = PropsFromRedux & IHomeScreen;

const HomeScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [checkIns, setCheckIns] = useState<ICheckIn[] | undefined>();
  const [featuredSummits, setFeaturedSummits] = useState<
    ISummit[] | undefined
  >();
  const [popularSummits, setPopularSummits] = useState<
    IPopularSummit[] | undefined
  >();

  // effect hooks
  useEffect(() => {
    CheckIn.getRecentCheckIns()
      .then((checkIns) => {
        setCheckIns(checkIns);
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

  const basicDetailsCardDimensions = { height: 128, width: 128 };
  const fullDetailsCardDimensions = { height: 288, width: 288 };
  const horizontalDetailsCardDimensions = {
    height: 128,
    width: 320,
  };

  return (
    <DismissKeyboard>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <ErrorOverlay error={error} />
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Feature", {
                    id: 1,
                    name: "Test",
                  })
                }
              >
                <BasicDetailsCard
                  dimensions={{
                    height: basicDetailsCardDimensions.height,
                    width: basicDetailsCardDimensions.width,
                  }}
                  item={item}
                />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={"start"}
            snapToInterval={basicDetailsCardDimensions.width + separator.width}
          />
        </View>
        <View style={styles.section}>
          <Text style={sectionTitle}>Recent check-ins</Text>
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={{ width: separator.width }} />
            )}
            data={checkIns}
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Feature", {
                    id: 1,
                    name: "Test",
                  })
                }
              >
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
  scrollView: {
    backgroundColor: colors.black01,
    flex: 1,
  },
  section: {
    marginBottom: 16,
    padding: 8,
  },
});
