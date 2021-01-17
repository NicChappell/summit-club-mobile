import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../../actions';
import { RootState } from '../../../reducers'
import {
    HomeScreen,
    SplashScreen,
    TourScreen
} from '../../../screens';
import { HomeTabsParamList } from './types';

type Props = PropsFromRedux & HomeTabsParamList;

// new bottom tab navigator
const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabs = ({ account, checkTour }: Props) => {
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

const mapStateToProps = ({ account }: RootState) => {
    return { account };
};

const mapDispatchToProps = {
    checkTour: actions.checkTour
};

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(HomeTabs);
