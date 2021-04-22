import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigatorHeader } from "../../../common/navigation";
import {
  ForgotPasswordScreen,
  SignInScreen,
  SignUpScreen,
} from "../../../screens";
import { AuthStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      headerMode="screen"
      initialRouteName="SignUp"
      screenOptions={{ header: StackNavigatorHeader }}
    >
      <Stack.Screen
        component={ForgotPasswordScreen}
        name="ForgotPassword"
        options={{
          title: "Forgot Password",
        }}
      />
      <Stack.Screen
        component={SignInScreen}
        name="SignIn"
        options={{
          headerShown: false,
          title: "Sign In",
        }}
      />
      <Stack.Screen
        component={SignUpScreen}
        name="SignUp"
        options={{
          headerShown: false,
          title: "Sign Up",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
