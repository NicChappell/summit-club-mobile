import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { ErrorOverlay, SearchResultsListItem } from "../../common/components";
import { IError } from "../../common/types";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { IErrorState, ISearchState, RootState } from "../../redux/reducers";
import { Summit, processFeatureCollection } from "../../services";
import { ISearchResultsScreen } from "./types";

type Props = PropsFromRedux & ISearchResultsScreen;

const SearchResultsScreen = ({
  error,
  navigation,
  route,
  search,
  setError,
  setFeature,
}: Props) => {
  // state hooks
  const [features, setFeatures] = useState<
    Feature<Geometry, GeoJsonProperties>[]
  >([]);

  // effect hooks
  useEffect(() => {
    // destructure search
    const { fuse, searchTerm } = search;

    // return early if fuse is undefined
    if (!fuse) return;

    // get search results
    const searchResults = fuse.search(searchTerm, {
      limit: 25,
    });

    // format values for database query
    const values = searchResults.map(({ item: { original } }) => original);

    Summit.findWhereIn("name", values)
      .then((resultSet) => {
        // convert result set into feature collection
        const { features } = processFeatureCollection(resultSet);

        // update local state
        setFeatures(features);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, [search]);

  // event handlers
  const handlePress = (feature: Feature<Geometry, GeoJsonProperties>) => {
    // update global state
    setFeature(feature);

    // navigate to Feature screen
    navigation.navigate("Feature", { screen: "Feature" });
  };

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <FlatList
        data={features}
        keyExtractor={(feature) => feature?.properties?.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <SearchResultsListItem item={item} />
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error as IErrorState,
    search: state.search as ISearchState,
  };
};

const mapDispatchToProps = {
  setError: actions.setError,
  setFeature: actions.setFeature,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchResultsScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  listItemImage: {
    height: "100%",
    width: "100%",
  },
  listItemImageContainer: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
});
