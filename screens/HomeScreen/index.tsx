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
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  CheckIn,
  ICheckIn,
  IFeaturedSummit,
  IPopularSummit,
  Summit,
} from "../../services";
import { CheckInCardContent } from "./components";
import { IHomeScreen } from "./interfaces";

import { MOCK_FEATURES } from "../../data/mocks/features";

const SEPARATOR_WIDTH = 16;

type Props = PropsFromRedux & IHomeScreen;

const HomeScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [checkIns, setCheckIns] = useState<ICheckIn[] | undefined>();
  const [featuredSummits, setFeaturedSummits] = useState<
    IFeaturedSummit[] | undefined
  >();
  const [popularSummits, setPopularSummits] = useState<
    IPopularSummit[] | undefined
  >();

  // effect hooks
  useEffect(() => {
    CheckIn.get()
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
          <Text style={styles.sectionTitle}>Featured summits</Text>
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.separator} />}
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
            snapToInterval={basicDetailsCardDimensions.width + SEPARATOR_WIDTH}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent check-ins</Text>
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            data={MOCK_FEATURES}
            decelerationRate={0}
            horizontal
            keyExtractor={(item) => item.properties?.id.toString()}
            renderItem={({ item }) => (
              <HorizontalDetailsCard
                ContentComponent={<CheckInCardContent />}
                dimensions={{
                  height: horizontalDetailsCardDimensions.height,
                  width: horizontalDetailsCardDimensions.width,
                }}
                feature={item}
              />
            )}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={"start"}
            snapToInterval={
              horizontalDetailsCardDimensions.width + SEPARATOR_WIDTH
            }
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular summits</Text>
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.separator} />}
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
            snapToInterval={fullDetailsCardDimensions.width + SEPARATOR_WIDTH}
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

const mapDispatchToProps = { setError: actions.setError };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(HomeScreen);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.black01,
    flex: 1,
  },
  section: {
    marginBottom: 24,
    padding: 8,
  },
  sectionTitle: {
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 24,
  },
  separator: {
    width: SEPARATOR_WIDTH,
  },
});
