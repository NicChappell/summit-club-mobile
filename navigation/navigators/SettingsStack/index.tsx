import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  createStackNavigator,
  StackHeaderProps,
} from "@react-navigation/stack";
import { colors, stackHeader } from "../../../common/styles";
import { ProfileScreen, ResetPasswordScreen } from "../../../screens";
import { SettingsStackParamList } from "./types";

const SettingsStackHeader = ({
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
const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="Profile"
      screenOptions={{ header: SettingsStackHeader }}
    >
      <Stack.Screen
        component={ProfileScreen}
        name="Profile"
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        component={ResetPasswordScreen}
        name="ResetPassword"
        options={{
          title: "Reset Password",
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;

const styles = stackHeader;
