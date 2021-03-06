import * as React from "react";
import { StatusBar, TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import { colors, stackHeader } from "../../../common/styles";
import {
  AccountScreen,
  ContactScreen,
  ProfileScreen,
  SettingsScreen,
  SummitsScreen,
} from "../../../screens";
import { ProfileStackParamList } from "./types";

const ProfileStackHeader = ({
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
const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Profile"
      screenOptions={{ header: ProfileStackHeader }}
    >
      <Stack.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        component={SummitsScreen}
        name="Summits"
        options={{
          title: "My Summits",
        }}
      />
      <Stack.Screen
        component={ContactScreen}
        name="Contact"
        options={{
          title: "Contact",
        }}
      />
      <Stack.Screen
        component={AccountScreen}
        name="Account"
        options={{
          title: "Account",
        }}
      />
      <Stack.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          title: "Settings",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;

const styles = stackHeader;
