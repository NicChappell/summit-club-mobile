import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';
import {
    AuthStack,
    MainTabs
} from './navigators';

const Navigation = ({ auth }) => {
    // destructure auth
    const { authToken } = auth;

    let navigator;
    if (authToken) {
        navigator = (<MainTabs />);
    } else {
        navigator = <AuthStack />;
    }

    return (
        <NavigationContainer>
            { navigator}
        </NavigationContainer>
    )
}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
