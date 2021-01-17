import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const SettingsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This is top text.</Text>
            <Text>SettingsScreen</Text>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
});
