import React from "react";
import { StatusBar, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import { colors, stackHeader } from "../../../common/styles";
import { FeatureScreen, ExploreScreen } from "../../../screens";
import { SummitsStackParamList } from "./types";

const SummitsStackHeader = ({
  navigation,
  previous,
  scene,
}: StackHeaderProps) => {
  // destructure scene
  const {
    descriptor: { options },
  } = scene;

  return (
    <View style={[styles.container, { paddingTop: useSafeAreaInsets().top }]}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.left}>
        {previous && (
          <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <Ionicons
              name={"ios-chevron-back"}
              size={28}
              color={colors.queenBlue}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text numberOfLines={1} style={styles.center}>
        {options.title}
      </Text>
      <View style={styles.right}>{/* intentionally empty */}</View>
    </View>
  );
};

// new stack navigator
const Stack = createStackNavigator<SummitsStackParamList>();

const SummitsStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Explore"
      screenOptions={{ header: SummitsStackHeader }}
    >
      <Stack.Screen
        component={ExploreScreen}
        name="Explore"
        options={{
          title: "Explore Summits",
        }}
      />
      <Stack.Screen
        component={FeatureScreen}
        name="Feature"
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default SummitsStack;

const styles = stackHeader;
