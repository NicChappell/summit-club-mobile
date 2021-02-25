import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { IPlacesScreen } from "./interfaces";

const PlacesScreen = ({ navigation, route }: IPlacesScreen) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>This is top text.</Text>
      <View>
        <Text>PlacesScreen</Text>
        <Button
          title="Go back to Profile"
          onPress={() => navigation.goBack()}
        />
      </View>
      <Text>This is bottom text.</Text>
    </SafeAreaView>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-between",
  },
});
