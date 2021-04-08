import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { TabNavigationHeader } from "../../common/navigation";
import { colors } from "../../common/styles";
import { IDownloadScreen } from "./interfaces";

const DownloadScreen = ({ navigation, route }: IDownloadScreen) => {
  return (
    <View style={styles.container}>
      <TabNavigationHeader navigation={navigation} route={route} />
      <Text>This is top text.</Text>
      <View>
        <Text>DownloadScreen</Text>
        <Text>
          This is where I will have options to download content for offline
          experience
        </Text>
        <Text>
          I'll still have some content download automatically, but this is where
          you can choose to download more sets of map tiles beyond the default
        </Text>
      </View>
      <Text>This is bottom text.</Text>
    </View>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "space-between",
  },
});
