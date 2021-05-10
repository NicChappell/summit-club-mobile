import React from "react";
import { StatusBar, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackHeaderProps } from "@react-navigation/stack";
import { CustomSearchBar } from "../../../common/components";
import {
  navigationHeaderCenterComponent,
  navigationHeaderContainer,
  navigationHeaderLeftComponent,
  navigationHeaderRightComponent,
  navigationHeaderTitle,
  navigationHeaderWrapper,
} from "../../styles";
import {
  LeftStackNavigatorControl,
  RightStackNavigatorControl,
} from "./components";

const StackNavigatorHeader = ({
  navigation,
  previous,
  scene,
}: StackHeaderProps) => {
  // destructure scene
  const {
    route: { name },
    descriptor: { options },
  } = scene;

  return (
    <View
      style={[navigationHeaderWrapper, { paddingTop: useSafeAreaInsets().top }]}
    >
      <StatusBar barStyle="dark-content" />
      {name === "Home" ? (
        <CustomSearchBar navigation={navigation} />
      ) : (
        <View style={navigationHeaderContainer}>
          <View style={navigationHeaderLeftComponent}>
            <LeftStackNavigatorControl
              name={name}
              navigation={navigation}
              previousScreen={!!previous}
            />
          </View>
          <View style={navigationHeaderCenterComponent}>
            <Text numberOfLines={1} style={navigationHeaderTitle}>
              {options.title}
            </Text>
          </View>
          <View style={navigationHeaderRightComponent}>
            <RightStackNavigatorControl name={name} navigation={navigation} />
          </View>
        </View>
      )}
    </View>
  );
};

export default StackNavigatorHeader;
