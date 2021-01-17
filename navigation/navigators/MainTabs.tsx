import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsStack from './SettingsStack';
import HomeTabs from './HomeTabs';
import {
    // HomeScreen,
    MapScreen,
    SummitsScreen
} from '../../screens';

// new bottom tab navigator
const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-home'
                            : 'ios-home-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused
                            ? 'ios-map'
                            : 'ios-map-outline';
                    } else if (route.name === 'Summits') {
                        iconName = focused
                            ? 'ios-flag'
                            : 'ios-flag-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused
                            ? 'ios-list'
                            : 'ios-list-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Home" component={HomeTabs} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Summits" component={SummitsScreen} />
            <Tab.Screen name="Settings" component={SettingsStack} />
        </Tab.Navigator >
    )
}

export default MainTabs;
