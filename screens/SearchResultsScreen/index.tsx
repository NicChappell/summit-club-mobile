import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { colors } from "../../common/styles";
import { ISearchResultsScreen } from "./interfaces";

const SearchResultsScreen = ({ navigation, route }: ISearchResultsScreen) => {
  return (
    <View style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>SearchResultsScreen</Text>
        <Button
          title="Go to Features"
          onPress={() =>
            navigation.navigate("Feature", {
              id: 1,
              name: 'mrah',
            })
          }
        />
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
