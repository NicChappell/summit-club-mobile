import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../common/styles";
import { ISearchResultsScreen } from "./interfaces";

const SearchResultsScreen = ({ navigation, route }: ISearchResultsScreen) => {
  return (
    <View style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>SearchResultsScreen</Text>
      </View>
      <Text>This is bottom text.</Text>
    </View>
  );
};

export default SearchResultsScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});
