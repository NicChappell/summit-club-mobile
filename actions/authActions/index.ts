import firebase from "firebase/app";
import "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthCredentials, IError } from "../../common/interfaces";
import { AppThunk } from "../../reducers";
import { SET_ERROR } from "../errorActions/types";
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from "./types";

export const signIn = (): AppThunk => async (dispatch) => {
  // retrieve id token from async storage
  const idToken = await AsyncStorage.getItem("idToken");

  if (idToken) {
    // user already authenticated
    dispatch({ type: SIGN_IN_SUCCESS, payload: { idToken } });
  } else {
    // user needs to authenticate
    try {
      // TODO: firebase authentication

      // set auth token to async storage
      const idToken = "authenticated";
      await AsyncStorage.setItem("idToken", idToken);

      // sign in if authentication successful
      dispatch({ type: SIGN_IN_SUCCESS, payload: { idToken } });
    } catch (error) {
      const payload: IError = {
        code: "TODO: HANDLE THIS ERROR",
        message: "TODO: HANDLE THIS ERROR",
      };

      dispatch({ type: SET_ERROR, payload });
    }
  }
};

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    // remove id token from async storage
    await AsyncStorage.removeItem("idToken");

    // sign out user
    dispatch({ type: SIGN_OUT_SUCCESS, payload: { idToken: undefined } });
  } catch (error) {
    const payload: IError = {
      code: "TODO: HANDLE THIS ERROR",
      message: "TODO: HANDLE THIS ERROR",
    };

    dispatch({ type: SET_ERROR, payload });
  }
};

export const signUp = (authCredentials: IAuthCredentials): AppThunk => async (
  dispatch
) => {
  try {
    // use credentials to create new user
    const {
      user,
    }: firebase.auth.UserCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(
        authCredentials.email,
        authCredentials.password
      );

    // get id token from user
    const idToken = await user?.getIdToken();

    if (idToken) {
      // set id token to async storage
      await AsyncStorage.setItem("idToken", idToken);

      // sign in if authentication successful
      dispatch({ type: SIGN_UP_SUCCESS, payload: { idToken } });
    }
  } catch (error) {
    const payload: IError = {
      code: error.code,
      message: error.message,
    };

    dispatch({ type: SET_ERROR, payload });
  }
};
