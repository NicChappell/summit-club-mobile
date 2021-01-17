import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import {
    LandmarksScreen,
    ProfileScreen,
    ResetPasswordScreen
} from '../../screens';

// new stack navigator
const Stack = createStackNavigator();

const SettingsStack = () => {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Landmarks" component={LandmarksScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </Stack.Navigator>
    )
}

export default SettingsStack;
