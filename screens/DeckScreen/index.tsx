import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DeckScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>DeckScreen</Text>
        </View>
    );
};

export default DeckScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center'
    },
});
