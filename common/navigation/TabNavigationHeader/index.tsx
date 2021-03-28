import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  navigationHeaderWrapper,
  navigationHeaderContainer,
} from "../../styles";
import { CenterComponent, LeftComponent, RightComponent } from "./components";
import { ITabNavigationHeader } from "./interfaces";

const TabNavigationHeader = ({ navigation }: ITabNavigationHeader) => {
  return (
    <View
      style={[navigationHeaderWrapper, { paddingTop: useSafeAreaInsets().top }]}
    >
      <Header
        barStyle={"dark-content"}
        containerStyle={[
          navigationHeaderContainer,
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
