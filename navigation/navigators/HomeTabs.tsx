import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {
    HomeScreen,
    SplashScreen,
    TourScreen
} from '../../screens';

// new bottom tab navigator
const Tab = createBottomTabNavigator();

const HomeTabs = ({ account, checkTour }) => {
    // destructure account
    const { skipTour } = account;
    console.log(skipTour);

    React.useEffect(() => {
        checkTour();
    }, []);

    if (skipTour === null) {
        return <SplashScreen />;
    }

    return (
        <Tab.Navigator screenOptions={{ tabBarVisible: false }}>
            {skipTour ? (
                <Tab.Screen name="Home" component={HomeScreen} />
            ) : (
                <Tab.Screen name="Tour" component={TourScreen} />
            )}
        </Tab.Navigator >
    )
}

const mapStateToProps = ({ account }) => {
    return { account };
};

const mapDispatchToProps = { checkTour: actions.checkTour };

export default connect(mapStateToProps, mapDispatchToProps)(HomeTabs);
