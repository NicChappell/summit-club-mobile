import React, { useRef, useState } from "react";
import { StatusBar, View, Text } from "react-native";
import { SearchBar } from "react-native-elements";
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
  searchBarLeftIconContainer,
  searchBarRightIconContainer,
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
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChangeText = (text: string) => setSearchInput(text);

  const handleClearIconPress = () => {
    // return early if searchBarRef is null
    if (!searchBarRef) return;

    // clear search bar input
    searchBarRef.current!.clear();
  };

  const handleSubmitEditing = () => {
    // navigate to Search Results screen
    navigation.navigate("SearchResults");
  };

  return (
    <View
      style={[navigationHeaderWrapper, { paddingTop: useSafeAreaInsets().top }]}
    >
      <StatusBar barStyle="dark-content" />
      {name === "Home" ? (
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
          leftIconContainerStyle={searchBarLeftIconContainer}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          placeholder="Find your next adventure"
          ref={searchBarRef}
          returnKeyType={"search"}
          rightIconContainerStyle={searchBarRightIconContainer}
          searchIcon={
            <Ionicons name={"ios-search"} size={22} color={colors.queenBlue} />
          }
          value={searchInput}
        />
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
