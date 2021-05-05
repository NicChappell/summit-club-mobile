import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  navigationHeaderContainer,
  navigationHeaderWrapper,
} from "../../styles";
import { CenterComponent, LeftComponent, RightComponent } from "./components";
import { ITabNavigationHeader } from "./types";

const TabNavigationHeader = ({ navigation, route }: ITabNavigationHeader) => {
  return (
    <View
      style={[navigationHeaderWrapper, { paddingTop: useSafeAreaInsets().top }]}
    >
      <Header
        barStyle={"dark-content"}
        containerStyle={navigationHeaderContainer}
        leftComponent={<LeftComponent navigation={navigation} route={route} />}
        centerComponent={<CenterComponent title={route.name} />}
        rightComponent={
          <RightComponent navigation={navigation} route={route} />
        }
      />
    </View>
  );
};

export default TabNavigationHeader;
