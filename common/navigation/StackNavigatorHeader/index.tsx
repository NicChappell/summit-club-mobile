import React, { useRef, useState } from "react";
import { StatusBar, StyleSheet, View, Text } from "react-native";
import { SearchBar } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackHeaderProps } from "@react-navigation/stack";
import {
  borderWidthReset,
  colors,
  inputBorder,
  inputContainer,
  inputIconContainer,
  inputStyle,
  marginReset,
  navigationHeaderCenterComponent,
  navigationHeaderContainer,
  navigationHeaderLeftComponent,
  navigationHeaderRightComponent,
  navigationHeaderTitle,
  navigationHeaderWrapper,
  paddingReset,
} from "../../styles";
import { LeftStackNavigatorControl } from "./components";

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

  const handleClearIconPress = () => {
    // return early if searchBarRef is null
    if (!searchBarRef) return;

    // clear search bar input
    searchBarRef.current!.clear();
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
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.searchBarInput}
          leftIconContainerStyle={styles.searchBarLeftIconContainer}
          onChangeText={(value) => setSearchInput(value)}
          placeholder="Find your next adventure"
          ref={searchBarRef}
          rightIconContainerStyle={styles.searchBarRightIconContainer}
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
            {/* intentionally empty */}
          </View>
        </View>
      )}
    </View>
  );
};

export default StackNavigatorHeader;

const styles = StyleSheet.create({
  searchBarContainer: {
    ...borderWidthReset,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: colors.white,
    height: 64,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  searchBarInput: {
    ...inputStyle,
    ...marginReset,
    ...paddingReset,
    height: 40,
  },
  searchBarInputContainer: {
    ...inputBorder,
    ...inputContainer,
    alignSelf: "stretch",
  },
  searchBarLeftIconContainer: {
    ...marginReset,
    ...paddingReset,
    ...inputIconContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarRightIconContainer: {
    ...marginReset,
    ...paddingReset,
    ...inputIconContainer,
    alignItems: "center",
    justifyContent: "center",
  },
});
