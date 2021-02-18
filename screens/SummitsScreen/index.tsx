import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ISummitsScreen } from './interfaces';

const SummitsScreen = ({ navigation, route }: ISummitsScreen) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This is top text.</Text>
            <Text>TODO: CHANGE THIS TO LANDMARKS</Text>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    );
};

export default SummitsScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
});
