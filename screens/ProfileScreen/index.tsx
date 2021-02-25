import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IProfileScreen } from './interfaces';

const ProfileScreen = ({ navigation, route }: IProfileScreen) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This is top text.</Text>
            <View>
                <Text>ProfileScreen</Text>
                <Button
                    title="Go to Reset Password"
                    onPress={() => navigation.navigate('ResetPassword')}
                />
            </View>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
});
