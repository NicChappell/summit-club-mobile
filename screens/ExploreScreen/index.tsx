import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  BasicDetailsCard,
  ErrorOverlay,
  HorizontalDetailsCard,
} from "../../common/components";
import { IError } from "../../common/interfaces";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { Collection, ICollection, Summit } from "../../services";
import { FeatureCardContent } from "./components";
import { IExploreScreen } from "./interfaces";
import { SortMethod, SortMethodIcon } from "./types";

const SEPARATOR_WIDTH = 16;

type Props = PropsFromRedux & IExploreScreen;

const ExploreScreen = ({ error, navigation, route, setError }: Props) => {
  // state hooks
  const [collections, setCollections] = useState<ICollection[] | undefined>();
  const [filteredSummits, setFilteredSummits] = useState<
    Feature<Geometry, GeoJsonProperties>[] | undefined
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
        <Text style={styles.sectionTitle}>Summit Collections</Text>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={styles.horizontalSeparator} />
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
          snapToInterval={basicDetailsCardDimensions.width + SEPARATOR_WIDTH}
        />
      </View>
      <View style={styles.verticalScrollSection}>
        <TouchableOpacity style={styles.sortBy} onPress={handleSortMethodPress}>
          <Text style={styles.sectionTitle}>Sort by elevation</Text>
          <Ionicons name={sortMethodIcon} size={20} color={colors.queenBlue} />
        </TouchableOpacity>
        <FlatList
          ItemSeparatorComponent={() => (
            <View style={styles.verticalSeparator} />
          )}
          data={filteredSummits}
          keyExtractor={(feature) => feature.properties?.id.toString()}
          renderItem={({ item: feature }) => (
            <HorizontalDetailsCard
              ContentComponent={<FeatureCardContent />}
              feature={feature}
            />
          )}
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
  horizontalSeparator: {
    width: SEPARATOR_WIDTH,
  },
  sectionTitle: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 20,
    marginBottom: 8,
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
  verticalSeparator: {
    height: SEPARATOR_WIDTH,
  },
});
