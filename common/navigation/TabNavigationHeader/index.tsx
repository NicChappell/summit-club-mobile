import React from "react";
import { StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import { CenterComponent, LeftComponent, RightComponent } from "./components";
import { ITabNavigationHeader } from "./interfaces";

const TabNavigationHeader = ({ navigation }: ITabNavigationHeader) => {
  return (
    <Header
      barStyle={"dark-content"}
      containerStyle={[
        styles.container,
        {
          marginTop: useSafeAreaInsets().top,
          paddingBottom: useSafeAreaInsets().top,
        },
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
  );
};

export default TabNavigationHeader;

const styles = StyleSheet.create({
  container: {
    ...borderWidthReset,
    ...paddingReset,
    ...marginReset,
    alignSelf: "stretch",
    backgroundColor: colors.white,
    borderBottomColor: colors.queenBlue50,
    borderBottomWidth: 1,
    height: 64,
    paddingLeft: 8,
    paddingRight: 8,
  },
});
