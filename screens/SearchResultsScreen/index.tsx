import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { ErrorOverlay, SummitDetailsListItem } from "../../common/components";
import { IError } from "../../common/types";
import { colors } from "../../common/styles";
import * as actions from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { ISummit, IPopularSummit, Summit, defaultBounds } from "../../services";
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
    console.log("fuse: ", fuse);
    console.log("searchTerm: ", searchTerm);

    const result = fuse.search(searchTerm, { limit: 25 });
    console.log("result: ", result);
  }, [search]);

  return (
    <View style={styles.container}>
      <ErrorOverlay error={error} />
      <FlatList
        data={filteredSummits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log("TODO")}>
            <SummitDetailsListItem item={item} />
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
