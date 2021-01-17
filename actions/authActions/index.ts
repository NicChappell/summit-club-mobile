import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    SIGN_IN_SUCCESS,
    SIGN_OUT_SUCCESS
} from './types';
import { doSignIn } from './helpers';

export const signIn = () => async dispatch => {
    // retrieve auth token from async storage
    const authToken = await AsyncStorage.getItem('authToken');

    if (authToken) {
        // sign in if already authenticated
        dispatch({ type: SIGN_IN_SUCCESS, payload: { authToken } });
    } else {
        // re-route to sign in flow
        doSignIn(dispatch);
    }
}

export const signOut = () => async dispatch => {
    try {
        // delete auth token from async storage
        await AsyncStorage.removeItem('authToken');

        // sign out user
        dispatch({ type: SIGN_OUT_SUCCESS, payload: { authToken: undefined } });
    }
    catch (error) {
        // handle signOut error
        // TODO
        console.log(error);
    }
}
