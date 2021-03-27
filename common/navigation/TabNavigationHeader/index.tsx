import React from "react";
import { StyleSheet, View } from "react-native";
import { Header } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, marginReset, paddingReset } from "../../styles";
import { CenterComponent, LeftComponent, RightComponent } from "./components";
import { ITabNavigationHeader } from "./interfaces";

const TabNavigationHeader = ({ navigation }: ITabNavigationHeader) => {
  return (
    <View style={[styles.wrapper, { paddingTop: useSafeAreaInsets().top }]}>
      <Header
        barStyle={"dark-content"}
        containerStyle={[
          styles.container,
          { paddingBottom: useSafeAreaInsets().top },
        ]}
        leftComponent={
          <LeftComponent
            name={"mrah"}
            navigation={navigation}
            previousScreen={true}
          />
        }
        centerComponent={<CenterComponent title="Profile" />}
        rightComponent={<RightComponent />}
      />
    </View>
  );
};

export default TabNavigationHeader;

const styles = StyleSheet.create({
  container: {
    ...paddingReset,
    ...marginReset,
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 64,
    justifyContent: "space-between",
    width: "100%",
  },
  wrapper: {
    backgroundColor: colors.white,
    borderBottomColor: colors.queenBlue50,
    borderBottomWidth: 1,
  },
});
