import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, ConnectedProps } from 'react-redux';
import * as actions from '../../actions';
import { RootState } from '../../reducers';
import { ISignInScreen } from './interfaces';

type Props = PropsFromRedux & ISignInScreen;

const SignInScreen = ({ navigation, route, signIn }: Props) => {
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

const mapStateToProps = (state: RootState) => {
    return {};
};

const mapDispatchToProps = { signIn: actions.signIn };

const connector = connect(
    mapStateToProps,
    mapDispatchToProps
);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SignInScreen);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'space-between'
    },
});
