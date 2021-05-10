import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { connect, ConnectedProps } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
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

const CustomSearchBar = ({ navigation }: ICustomSearchBar) => {
  // state hooks
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // boolean conditions
  const renderSuggestions = searchResults.length > 0;

  const trieText = (text: string) => {
    if (text) {
      return [
        "Blanca Peak",
        "Capitol Peak",
        "Castle Peak",
        "Challenger Point",
        "Conundrum Peak",
        "Crestone Needle",
        "Crestone Peak",
        "Culebra Peak",
        "El Diente Peak",
        "Ellingwood Point",
        "Grays Peak",
      ];
    }
    return [];
  };

  // ref hooks
  const searchBarRef = useRef<SearchBar>(null);

  const handleBlur = () => {
    setIsVisible(false);
    setSearchResults([]);
  };

  const handleChangeText = (text: string) => {
    // retrieve matching keys from search Trie
    const searchResults = trieText(text);
    console.log(searchResults);
    console.log(searchResults.slice(0, text.length));

    setSearchInput(text);
    setSearchResults(searchResults.slice(0, text.length));
  };

  const handleClearIconPress = () => {
    // return early if searchBarRef is null
    if (!searchBarRef) return;

    // clear search bar input
    searchBarRef.current!.clear();
  };

  const handleFocus = () => {
    // retrieve matching keys from search Trie
    const searchResults = trieText(searchInput);

    setIsVisible(true);
    setSearchResults(searchResults.slice(0, searchInput.length));
  };

  const handleSearch = () => {
    // navigate to Search Results screen
    navigation.navigate("SearchResults");
  };

  return (
    <View style={searchBarWrapper}>
      <SearchBar
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
        ref={searchBarRef}
        returnKeyType={"search"}
        rightIconContainerStyle={searchBarIconContainer}
        searchIcon={
          <Ionicons name={"ios-search"} size={22} color={colors.queenBlue} />
        }
        value={searchInput}
      />
      {isVisible && (
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
            {searchResults.map((searchResult, index) => (
              <TouchableOpacity key={index} onPress={handleSearch}>
                <Text style={searchSuggestion}>{searchResult}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  console.log("state: ", state);
  return {};
};

const mapDispatchToProps = {};

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
