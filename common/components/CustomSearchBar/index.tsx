import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as actions from "../../../redux/actions";
import { IErrorState, ISearchState, RootState } from "../../../redux/reducers";
import { ISummitName, processFeature, Summit } from "../../../services";
import {
  colors,
  searchBarContainer,
  searchBarInput,
  searchBarInputContainer,
  searchBarIconContainer,
  searchBarWrapper,
  searchButton,
  searchButtonTitle,
  searchSuggestion,
  searchSuggestionsContainer,
  searchSuggestionsWrapper,
} from "../../styles";
import { ICustomSearchBar } from "./types";

type Props = PropsFromRedux & ICustomSearchBar;

const CustomSearchBar = ({
  error,
  navigation,
  search,
  setError,
  setFeature,
  setSearchTerm,
}: Props) => {
  // destructure search
  const { summitNames, trie } = search;

  // state hooks
  const [isSearchButtonVisible, setIsSearchButtonVisible] = useState<boolean>(
    false
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<ISummitName[]>();

  // boolean conditions
  const renderSearchSuggestions = Boolean(searchSuggestions?.length);

  // effect hooks
  useEffect(() => {
    let searchSuggestions: ISummitName[] | undefined;
    let suggestions: string[] | undefined;

    // retrieve suggestions from search Trie
    if (searchInput.length > 1) {
      // 6 --> "a", "e", "i", "o", "u" & "y"
      suggestions = trie?.complete(searchInput.toLowerCase(), 6);
    }

    // clear search Trie suggestions
    trie?.clear();

    // format search suggestions
    if (Boolean(suggestions?.length)) {
      searchSuggestions = summitNames
        ?.filter((summitName) => {
          return suggestions!.indexOf(summitName.lowercase) > -1;
        })
        .slice(0, 10);
    }

    // update local state
    setSearchSuggestions(searchSuggestions);
  }, [searchInput]);

  const handleBlur = () => {
    setIsSearchButtonVisible(false);
    setSearchSuggestions([]);
  };

  const handleChangeText = (text: string) => setSearchInput(text);

  const handleClearIconPress = () => {
    setSearchInput("");
    setSearchSuggestions([]);
  };

  const handleFocus = () => setIsSearchButtonVisible(true);

  const handlePress = async ({ original: name }: ISummitName) => {
    // update local state
    setSearchInput(name);

    try {
      // retrieve feature from database
      const resultSet = await Summit.findByName(name);

      // format result
      const feature = processFeature(resultSet);

      // update global state
      setFeature(feature);

      // navigate to Feature screen
      navigation.navigate("Feature", { screen: "Feature" });
    } catch (error) {
      setError({
        code: error.code,
        message: error.message,
      });
    }
  };

  const handleSearch = () => {
    // update global state
    setSearchTerm(searchInput);

    // navigate to Search Results screen
    navigation.navigate("SearchResults");
  };

  return (
    <View style={searchBarWrapper}>
      <SearchBar
        autoCapitalize="none"
        autoCompleteType="off"
        clearIcon={
          <Ionicons
            name={"ios-close"}
            size={22}
            color={colors.queenBlue}
            onPress={handleClearIconPress}
          />
        }
        containerStyle={searchBarContainer}
        inputContainerStyle={searchBarInputContainer}
        inputStyle={searchBarInput}
        leftIconContainerStyle={searchBarIconContainer}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onSubmitEditing={handleSearch}
        placeholder="Find your next adventure"
        returnKeyType={"search"}
        rightIconContainerStyle={searchBarIconContainer}
        searchIcon={
          <Ionicons name={"ios-search"} size={22} color={colors.queenBlue} />
        }
        value={searchInput}
      />
      {isSearchButtonVisible && (
        <Button
          buttonStyle={searchButton}
          onPress={handleSearch}
          title="Search"
          titleStyle={searchButtonTitle}
        />
      )}
      {renderSearchSuggestions && (
        <View style={searchSuggestionsWrapper}>
          <View style={searchSuggestionsContainer}>
            {searchSuggestions?.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(suggestion)}
              >
                <Text numberOfLines={1} style={searchSuggestion}>
                  {suggestion.original}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
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
  setSearchTerm: actions.setSearchTerm,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CustomSearchBar);

const styles = StyleSheet.create({
  switch: {
    borderColor: colors.queenBlue,
    borderWidth: 2,
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    marginRight: -4,
  },
});
