import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
    ForgotPasswordScreen,
    SignInScreen,
    SignUpScreen
} from '../../screens';

// new stack navigator
const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack;
