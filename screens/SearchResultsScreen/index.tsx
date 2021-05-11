import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import {
  ErrorOverlay,
  SearchResultsListItem,
  SummitDetailsListItem,
} from "../../common/components";
import { IError } from "../../common/types";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { ISummit, IPopularSummit, Summit, defaultBounds } from "../../services";
import { ISearchResultsScreen } from "./types";

type Props = PropsFromRedux & ISearchResultsScreen;

interface ISearchResult {
  item: {
    lowercase: string;
    original: string;
  };
  refIndex: number;
}

const SearchResultsScreen = ({
  error,
  navigation,
  route,
  search,
  setError,
}: Props) => {
  // state hooks
  const [filteredSummits, setFilteredSummits] = useState<ISummit[]>([]);
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);

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

    // get search results
    const searchResults = fuse.search(searchTerm, { limit: 25 });
    console.log(searchResults);

    // update state
    setSearchResults(searchResults);
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
        }) => (
          <TouchableOpacity onPress={() => console.log("TODO")}>
            <SearchResultsListItem name={name} />
            {/* <SummitDetailsListItem item={item} /> */}
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    error: state.error,
    search: state.search,
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
