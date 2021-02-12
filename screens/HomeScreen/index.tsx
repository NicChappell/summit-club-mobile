import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../store/actions';
import { RootState } from '../../store/reducers';
import { IHomeScreen } from './interfaces';

type Props = PropsFromRedux & IHomeScreen;

const HomeScreen = ({ navigation, resetTour, route, signOut }: Props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This is top text.</Text>
            <View>
                <Text>HomeScreen</Text>
                <Button title="Reset tour" onPress={resetTour} />
                <Button title="Sign out" onPress={signOut} />
            </View>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    );
};

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = {
    resetTour: actions.resetTour,
    signOut: actions.signOut
};

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(HomeScreen);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
});
