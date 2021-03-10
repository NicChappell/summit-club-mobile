import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { HorizontalDetailsCard } from "../../common/components";
import { colors } from "../../common/styles";
import { IExploreScreen } from "./interfaces";

const ExploreScreen = ({ navigation, route }: IExploreScreen) => {
  return (
    <View style={styles.container}>
      <HorizontalDetailsCard />
      <HorizontalDetailsCard />
      <HorizontalDetailsCard />
      <HorizontalDetailsCard />
      <View>
        <Text>ExploreScreen</Text>
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
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});
