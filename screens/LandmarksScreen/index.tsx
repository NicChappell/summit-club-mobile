import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

const LandmarksScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This is top text.</Text>
            <View>
                <Text>LandmarksScreen</Text>
                <Button
                    title="Go back to Profile"
                    onPress={() => navigation.goBack()}
                />
            </View>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    );
};

export default LandmarksScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
});
