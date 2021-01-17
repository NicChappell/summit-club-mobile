import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Slides from './components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Summit Club', color: '#03A9F4' },
    { text: 'Hit the trails', color: '#009688' },
    { text: 'Adventure awaits', color: '#9F403A' }
];

const TourScreen = ({ completeTour }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Slides
                data={SLIDE_DATA}
                onComplete={completeTour}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = { completeTour: actions.completeTour };

export default connect(mapStateToProps, mapDispatchToProps)(TourScreen);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
});
