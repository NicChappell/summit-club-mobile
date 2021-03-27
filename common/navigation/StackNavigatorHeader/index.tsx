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
    <View style={[styles.wrapper, { paddingTop: useSafeAreaInsets().top }]}>
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
        <View style={styles.container}>
          <View style={styles.left}>
            <LeftStackNavigatorControl
              name={name}
              navigation={navigation}
              previousScreen={!!previous}
            />
          </View>
          <View style={styles.center}>
            <Text numberOfLines={1} style={styles.title}>
              {options.title}
            </Text>
          </View>
          <View style={styles.right}>{/* intentionally empty */}</View>
        </View>
      )}
    </View>
  );
};

export default StackNavigatorHeader;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    backgroundColor: "orange",
    height: 64,
    justifyContent: "center",
  },
  container: {
    ...paddingReset,
    ...marginReset,
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 64,
    justifyContent: "space-between",
    width: "100%",
  },
  left: {
    backgroundColor: "red",
    height: 64,
    width: 64,
  },
  right: {
    alignItems: "center",
    backgroundColor: "green",
    height: 64,
    justifyContent: "center",
    width: 64,
  },
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
  title: {
    color: colors.queenBlue,
    fontFamily: "NotoSansJP_700Bold",
    fontSize: 16,
  },
  wrapper: {
    backgroundColor: colors.white,
    borderBottomColor: colors.queenBlue50,
    borderBottomWidth: 1,
  },
});
