import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as actions from "../../../redux/actions";
import { RootState } from "../../../redux/reducers";
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
  searchSuggestions,
  searchSuggestionsContainer,
} from "../../styles";
import { ICustomSearchBar } from "./types";

type Props = PropsFromRedux & ICustomSearchBar;

const CustomSearchBar = ({ navigation, search, setSearchTerm }: Props) => {
  // destructure search
  const { trie } = search;

  // state hooks
  const [isSearchButtonVisible, setIsSearchButtonVisible] = useState<boolean>(
    false
  );
  const [searchInput, setSearchInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // boolean conditions
  const renderSuggestions = suggestions.length > 0;

  // effect hooks
  useEffect(() => {}, []);

  const handleBlur = () => {
    setIsSearchButtonVisible(false);
    setSuggestions([]);
  };

  const handleChangeText = (text: string) => {
    let suggestions: string[] = [];
    if (text.length > 1) {
      // retrieve suggestions from search Trie
      suggestions = trie.complete(text.toLowerCase(), 6); // A,E,I,O,U & Y
    }

    // clear search Trie suggestions
    trie.clear();

    // update state
    setSearchInput(text);
    setSuggestions(suggestions.slice(0, 10));
  };

  const handleClearIconPress = () => {
    setSearchInput("");
    setSuggestions([]);
  };

  const handleFocus = () => setIsSearchButtonVisible(true);

  const handlePress = (searchResult: string) => {
    // update local state
    setSearchInput(searchResult);

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
      {renderSuggestions && (
        <View style={searchSuggestionsContainer}>
          <View style={searchSuggestions}>
            {suggestions.map((searchResult, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(searchResult)}
              >
                <Text numberOfLines={1} style={searchSuggestion}>
                  {searchResult}
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
    search: state.search,
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
