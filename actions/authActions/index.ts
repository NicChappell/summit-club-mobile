import firebase from "firebase/app";
import "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthCredentials, IError } from "../../common/interfaces";
import { AppThunk } from "../../reducers";
import { SET_ERROR } from "../errorActions/types";
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS, SIGN_UP_SUCCESS } from "./types";

export const signIn = (): AppThunk => async (dispatch) => {
  // retrieve auth token from async storage
  const authToken = await AsyncStorage.getItem("authToken");

  if (authToken) {
    // user already authenticated
    dispatch({ type: SIGN_IN_SUCCESS, payload: { authToken } });
  } else {
    // user needs to authenticate
    try {
      // await auth token from server
      // TODO

      // set auth token to async storage
      const authToken = "authenticated";
      await AsyncStorage.setItem("authToken", authToken);

      // sign in if authentication successful
      dispatch({ type: SIGN_IN_SUCCESS, payload: { authToken } });
    } catch (error) {
      // TODO: handle sign in error
      console.log(error);
    }
  }
};

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    // delete auth token from async storage
    await AsyncStorage.removeItem("authToken");

    // sign out user
    dispatch({ type: SIGN_OUT_SUCCESS, payload: { authToken: undefined } });
  } catch (error) {
    // TODO: handle sign out error
    console.log(error);
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

    console.log(user!.uid);

    // // authenticate user
    // dispatch({ type: SIGN_UP_SUCCESS, payload: { uid: user.uid } });
  } catch (error) {
    const payload: IError = {
      code: error.code,
      message: error.message,
    };

    dispatch({ type: SET_ERROR, payload });
  }
};
