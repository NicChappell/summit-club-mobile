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
import { colors, sectionTitle, separator } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import {
  Collection,
  ICollection,
  ISummit,
  Summit,
} from "../../services";
import { IExploreScreen } from "./interfaces";
import { SortMethod, SortMethodIcon } from "./types";

type Props = PropsFromRedux & IExploreScreen;

const ExploreScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [collections, setCollections] = useState<ICollection[] | undefined>();
  const [filteredSummits, setFilteredSummits] = useState<
    ISummit[] | undefined
  >();
  const [sortMethod, setSortMethod] = useState<SortMethod>("descending");
  const [sortMethodIcon, setSortMethodIcon] = useState<SortMethodIcon>(
    "ios-caret-down"
  );

  // effect hooks
  useEffect(() => {
    Collection.get()
      .then((collections) => {
        setCollections(collections);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });

    Summit.query()
      .then((filteredSummits) => {
        setFilteredSummits(filteredSummits);
      })
      .catch((error: IError) => {
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

  const basicDetailsCardDimensions = { height: 48, width: 128 };

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
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
      <View style={styles.verticalScrollSection}>
        <TouchableOpacity style={styles.sortBy} onPress={handleSortMethodPress}>
          <Text style={sectionTitle}>Sort by elevation</Text>
          <Ionicons name={sortMethodIcon} size={20} color={colors.queenBlue} />
        </TouchableOpacity>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={{ height: separator.height }} />
          )}
          data={filteredSummits}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HorizontalDetailsCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
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

export default connector(ExploreScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    backgroundColor: colors.black01,
    flex: 1,
    justifyContent: "flex-start",
    padding: 8,
  },
  horizontalScrollSection: {
    alignSelf: "stretch",
    borderBottomColor: colors.queenBlue25,
    borderBottomWidth: 1,
    paddingBottom: 16,
    paddingTop: 8,
  },
  sortBy: {
    alignItems: "baseline",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  verticalScrollSection: {
    alignSelf: "stretch",
    flex: 1,
    marginTop: 16,
  },
});
