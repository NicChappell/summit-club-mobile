import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import Fuse from "fuse.js";
import { ErrorOverlay, SearchResultsListItem } from "../../common/components";
import { IError } from "../../common/types";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { IErrorState, ISearchState, RootState } from "../../redux/reducers";
import { ISummit, ISummitName, Summit, defaultBounds } from "../../services";
import { ISearchResultsScreen } from "./types";

type Props = PropsFromRedux & ISearchResultsScreen;

const SearchResultsScreen = ({
  error,
  navigation,
  route,
  search,
  setError,
}: Props) => {
  // state hooks
  const [filteredSummits, setFilteredSummits] = useState<ISummit[]>([]);
  const [searchResults, setSearchResults] = useState<
    Fuse.FuseResult<ISummitName>[]
  >([]);

  // effect hooks
  useEffect(() => {
    Summit.query({
      bounds: defaultBounds,
      filters: "",
      orderBy: "DESC",
      limit: 64,
      offset: 0,
    })
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

  useEffect(() => {
    // destructure search
    const { fuse, searchTerm } = search;

    // return early if fuse is undefined
    if (!fuse) return;

    // get search results
    const searchResults = fuse.search(searchTerm, {
      limit: 25,
    });

    // update state
    setSearchResults(searchResults);

    // format values for database query
    const values = searchResults.map(({ item: { original } }) => original);

    Summit.findWhereIn("name", values)
      .then((summits) => {
        console.log("summits: ", summits);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, [search]);

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.refIndex.toString()}
        renderItem={({
          item: {
            item: { original: name },
          },
        }) => <SearchResultsListItem navigation={navigation} name={name} />}
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
