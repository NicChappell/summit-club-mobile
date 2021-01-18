import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGN_IN_SUCCESS } from './types';

export const doSignIn = async dispatch => {
    // await auth token from server
    // TODO

    // handle authentication/server error
    // TODO

    // set auth token to async storage
    const authToken = 'authenticated'
    await AsyncStorage.setItem('authToken', authToken);

    // sign in if authentication successful
    dispatch({ type: SIGN_IN_SUCCESS, payload: { authToken } });
};