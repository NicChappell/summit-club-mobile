import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { RootState } from '../../reducers'
import TourSlides from './components/TourSlides';
import { ITourScreen, ITourSlide } from './interfaces';

const SLIDE_DATA: ITourSlide[] = [
    { id: 0, text: 'Welcome to Summit Club', color: '#03A9F4' },
    { id: 1, text: 'Hit the trails', color: '#009688' },
    { id: 2, text: 'Adventure awaits', color: '#9F403A' }
];

const TourScreen = ({ completeTour, navigation, route }: ITourScreen) => {
    return (
        <SafeAreaView style={styles.container}>
            <TourSlides
                data={SLIDE_DATA}
                onComplete={completeTour}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = (state: RootState) => {
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
