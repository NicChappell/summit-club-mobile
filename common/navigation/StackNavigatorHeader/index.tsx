import React, { useRef, useState } from "react";
import { StatusBar, View, Text, TouchableOpacity } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackHeaderProps } from "@react-navigation/stack";
import {
  colors,
  navigationHeaderCenterComponent,
  navigationHeaderContainer,
  navigationHeaderLeftComponent,
  navigationHeaderRightComponent,
  navigationHeaderTitle,
  navigationHeaderWrapper,
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
import {
  LeftStackNavigatorControl,
  RightStackNavigatorControl,
} from "./components";

const StackNavigatorHeader = ({
  navigation,
  previous,
  scene,
}: StackHeaderProps) => {
  // destructure scene
  const {
    route: { name },
    descriptor: { options },
  } = scene;

  // ref hooks
  const searchBarRef = useRef<SearchBar>(null);

  // state hooks
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleBlur = () => setIsVisible(false);

  const handleChangeText = (text: string) => {
    setSearchInput(text);

    text
      ? setSearchResults([
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
        ])
      : setSearchResults([]);
  };

  const handleClearIconPress = () => {
    // return early if searchBarRef is null
    if (!searchBarRef) return;

    // clear search bar input
    searchBarRef.current!.clear();
  };

  const handleFocus = () => setIsVisible(true);

  const handleSearch = () => {
    // navigate to Search Results screen
    navigation.navigate("SearchResults");
  };

  return (
    <View
      style={[navigationHeaderWrapper, { paddingTop: useSafeAreaInsets().top }]}
    >
      <StatusBar barStyle="dark-content" />
      {name === "Home" ? (
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
              <Ionicons
                name={"ios-search"}
                size={22}
                color={colors.queenBlue}
              />
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
          <View style={searchSuggestionsContainer}>
            <View style={searchSuggestions}>
              {searchResults.slice(7).map((searchResult, index) => (
                <TouchableOpacity key={index} onPress={handleSearch}>
                  <Text style={searchSuggestion}>{searchResult}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ) : (
        <View style={navigationHeaderContainer}>
          <View style={navigationHeaderLeftComponent}>
            <LeftStackNavigatorControl
              name={name}
              navigation={navigation}
              previousScreen={!!previous}
            />
          </View>
          <View style={navigationHeaderCenterComponent}>
            <Text numberOfLines={1} style={navigationHeaderTitle}>
              {options.title}
            </Text>
          </View>
          <View style={navigationHeaderRightComponent}>
            <RightStackNavigatorControl name={name} navigation={navigation} />
          </View>
        </View>
      )}
    </View>
  );
};

export default StackNavigatorHeader;
