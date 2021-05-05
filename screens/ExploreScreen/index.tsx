import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  BasicDetailsCard,
  ErrorOverlay,
  HorizontalDetailsCard,
} from "../../common/components";
import { IError } from "../../common/interfaces";
import { TabNavigationHeader } from "../../common/navigation";
import { colors, sectionTitle, separator } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  Collection,
  ICollection,
  ISummit,
  Summit,
  defaultBounds,
} from "../../services";
import { IExploreScreen, SortMethod, SortMethodIcon } from "./types";

type Props = PropsFromRedux & IExploreScreen;

const ExploreScreen = ({
  error,
  navigation,
  route,
  setError,
  setFeature,
}: Props) => {
  console.log(route);
  // state hooks
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [filteredSummits, setFilteredSummits] = useState<ISummit[]>([]);
  const [sortMethod, setSortMethod] = useState<SortMethod>("descending");
  const [sortMethodIcon, setSortMethodIcon] = useState<SortMethodIcon>(
    "ios-caret-down"
  );

  // effect hooks
  useEffect(() => {
    Collection.get()
      .then((collections) => {
        // update state
        setCollections(collections);
      })
      .catch((error: IError) => {
        // dispatch error
        setError({
          code: error.code,
          message: error.message,
        });
      });

    Summit.query({
      bounds: defaultBounds,
      filters: "",
      orderBy: "DESC",
      limit: 64,
      offset: 0,
    })
      .then((queriedSummits) => {
        // update state
        setFilteredSummits(queriedSummits);
      })
      .catch((error: IError) => {
        // dispatch error
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, []);

  const handleSortMethodPress = () => {
    if (sortMethod === "descending") {
      setSortMethod("ascending");
      setSortMethodIcon("ios-caret-up");
    } else {
      setSortMethod("descending");
      setSortMethodIcon("ios-caret-down");
    }
  };

  const handleCollectionPress = (item: ICollection) => {
    console.log(item);
  };

  const handleSummitPress = (item: ISummit) => {
    // destructure item
    const { feature } = item;

    // update global state
    setFeature(feature);

    // navigate to Feature screen
    navigation.navigate("Feature", { screen: "Feature" });
  };

  // fetch more summits
  const fetchMoreSummits = async () => {
    try {
      // query filtered summits
      const queriedSummits = await Summit.query({
        bounds: defaultBounds,
        filters: "",
        orderBy: "DESC",
        limit: 64,
        offset: filteredSummits.length,
      });

      // update state
      setFilteredSummits([...filteredSummits, ...queriedSummits]);
    } catch (error) {
      // dispatch error
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const basicDetailsCardDimensions = { height: 48, width: 128 };
  const horizontalDetailsCardDimensions = {
    height: 96,
    width: "100%",
  };

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <TabNavigationHeader navigation={navigation} route={route} />
      <View style={styles.content}>
        <View style={styles.horizontalScrollSection}>
          <Text style={sectionTitle}>Summit Collections</Text>
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={{ width: separator.width }} />
            )}
            data={collections}
            decelerationRate={0}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCollectionPress(item)}>
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
        <View style={styles.verticalScrollSection}>
          <TouchableOpacity
            style={styles.sortBy}
            onPress={handleSortMethodPress}
          >
            <Text style={sectionTitle}>Sort by elevation</Text>
            <Ionicons
              name={sortMethodIcon}
              size={20}
              color={colors.queenBlue}
            />
          </TouchableOpacity>
          <FlatList
            ItemSeparatorComponent={() => (
              <View style={{ height: separator.height }} />
            )}
            data={filteredSummits}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={fetchMoreSummits}
            onEndReachedThreshold={2}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => handleSummitPress(item)}>
                  <HorizontalDetailsCard
                    dimensions={{
                      height: horizontalDetailsCardDimensions.height,
                      width: horizontalDetailsCardDimensions.width,
                    }}
                    item={item}
                  />
                </TouchableOpacity>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
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

export default connector(ExploreScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black01,
    flex: 1,
  },
  content: {
    alignItems: "stretch",
    flex: 1,
    justifyContent: "flex-start",
    margin: 8,
  },
  horizontalScrollSection: {
    borderBottomColor: colors.queenBlue25,
    borderBottomWidth: 1,
    flex: 0,
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  sortBy: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  verticalScrollSection: {
    flex: 1,
  },
});
