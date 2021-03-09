import React, { useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import {
  borderReset,
  colors,
  inputBorder,
  inputContainer,
  inputIconContainer,
  inputStyle,
  marginReset,
  paddingReset,
} from "../../../common/styles";
import {
  FeatureScreen,
  HomeScreen,
  SearchResultsScreen,
} from "../../../screens";
import { HomeStackParamList } from "./types";

const HomeStackHeader = ({ navigation, previous, scene }: StackHeaderProps) => {
  // destructure scene
  const {
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
    <View style={[styles.container, { paddingTop: useSafeAreaInsets().top }]}>
      <StatusBar barStyle="dark-content" />
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
    </View>
  );
};

// new stack navigator
const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Home"
      screenOptions={{ header: HomeStackHeader }}
    >
      <Stack.Screen
        component={HomeScreen}
        name="Home"
        options={{
          title: "Summit Club",
        }}
      />
      <Stack.Screen
        component={FeatureScreen}
        name="Feature"
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        component={SearchResultsScreen}
        name="SearchResults"
        options={{
          title: "Search Results",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomColor: colors.queenBlue50,
    borderBottomWidth: 1,
  },
  searchBarContainer: {
    ...borderReset,
    backgroundColor: colors.white,
    alignSelf: "stretch",
    padding: 8,
  },
  searchBarInput: {
    ...inputStyle,
    ...marginReset,
    ...paddingReset,
  },
  searchBarInputContainer: {
    ...inputBorder,
    ...inputContainer,
  },
  searchBarLeftIconContainer: {
    ...marginReset,
    ...paddingReset,
    ...inputIconContainer,
  },
  searchBarRightIconContainer: {
    ...marginReset,
    ...paddingReset,
    ...inputIconContainer,
  },
});
