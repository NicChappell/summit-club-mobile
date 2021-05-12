import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as actions from "../../../redux/actions";
import { ISearchState, RootState } from "../../../redux/reducers";
import { ISummitName } from "../../../services";
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

const CustomSearchBar = ({ navigation, search, setSearchTerm }: Props) => {
  // destructure search
  const { summitNames, trie } = search;

  // state hooks
  const [isSearchButtonVisible, setIsSearchButtonVisible] = useState<boolean>(
    false
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchSuggestions, setSearchSuggestions] = useState<ISummitName[]>();

  // boolean conditions
  const renderSearchSuggestions =
    searchSuggestions && searchSuggestions.length > 0;

  // effect hooks
  useEffect(() => {}, []);

  const handleBlur = () => {
    setIsSearchButtonVisible(false);
    setSearchSuggestions([]);
  };

  const handleChangeText = (text: string) => {
    // get search Trie suggestions
    let suggestions: string[] | undefined;
    if (text.length > 1) {
      // retrieve suggestions from search Trie
      // 6 --> "a", "e", "i", "o", "u" & "y"
      suggestions = trie?.complete(text.toLowerCase(), 6);
    }

    console.log("suggestions: ", suggestions);

    // clear search Trie suggestions
    trie?.clear();

    // format search suggestions
    let searchSuggestions: ISummitName[] | undefined;
    if (Boolean(suggestions?.length) && Boolean(summitNames)) {
      searchSuggestions = summitNames
        ?.filter((summitName) => {
          return suggestions!.indexOf(summitName.lowercase) > -1;
        })
        .slice(0, 10);
    }
    console.log("searchSuggestions: ", searchSuggestions);

    // update state
    setSearchInput(text);
    setSearchSuggestions(searchSuggestions);
  };

  const handleClearIconPress = () => {
    setSearchInput("");
    setSearchSuggestions([]);
  };

  const handleFocus = () => setIsSearchButtonVisible(true);

  const handlePress = (searchResult: ISummitName) => {
    // update local state
    setSearchInput(searchResult.original);

    // navigate to Search Results screen
    navigation.navigate("SearchResults");
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
    search: state.search as ISearchState,
  };
};

const mapDispatchToProps = {
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
