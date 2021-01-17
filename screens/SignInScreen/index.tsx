import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import * as actions from '../actions';

const SignInScreen = ({ signIn, navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>This is top text.</Text>
            <View>
                <Text>SignInScreen</Text>
                <Button
                    title="Sign In"
                    onPress={() => signIn()}
                />
                <Button
                    title="Go to Sign Up"
                    onPress={() => navigation.navigate('SignUp')}
                />
                <Button
                    title="Go to Forgot Password"
                    onPress={() => navigation.navigate('ForgotPassword')}
                />
            </View>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = { signIn: actions.signIn };

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
});
