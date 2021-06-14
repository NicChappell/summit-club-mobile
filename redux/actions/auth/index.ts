import firebase from "firebase/app";
import "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthCredentials, IError } from "../../../common/types";
import { AppThunk } from "../../reducers";
import { SET_ERROR } from "../error/types";
import { SIGN_IN, SIGN_OUT, SIGN_UP } from "./types";

import { User } from "../../../services";

export const checkAuthentication = (): AppThunk => async (dispatch) => {
  // retrieve uid from async storage
  const uid = await AsyncStorage.getItem("uid");

  if (uid) {
    // authenticate user
    dispatch({ type: SIGN_IN, payload: { uid } });
  }
};

export const signIn =
  (authCredentials: IAuthCredentials): AppThunk =>
  async (dispatch) => {
    try {
      // submit credentials to authenticate user
      const { user }: firebase.auth.UserCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(
          authCredentials.email,
          authCredentials.password
        );

      if (user) {
        // set uid in async storage
        await AsyncStorage.setItem("uid", user.uid);

        // authenticate user
        dispatch({ type: SIGN_IN, payload: { uid: user.uid } });
      }
    } catch (error) {
      const payload: IError = {
        code: error.code,
        message: error.message,
      };

      dispatch({ type: SET_ERROR, payload });
    }
  };

export const signOut = (): AppThunk => async (dispatch) => {
  try {
    // sign out from firebase
    firebase.auth().signOut();

    // remove id token from async storage
    await AsyncStorage.removeItem("uid");

    // void user
    dispatch({ type: SIGN_OUT, payload: { uid: undefined } });
  } catch (error) {
    const payload: IError = {
      code: "TODO: HANDLE THIS ERROR",
      message: "TODO: HANDLE THIS ERROR",
    };

    dispatch({ type: SET_ERROR, payload });
  }
};

export const signUp =
  (authCredentials: IAuthCredentials): AppThunk =>
  async (dispatch) => {
    try {
      // submit credentials to create new user
      const { user }: firebase.auth.UserCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          authCredentials.email,
          authCredentials.password
        );

      if (user) {
        // set uid in async storage
        await AsyncStorage.setItem("uid", user.uid);

        // asdf
        await User.add(user.uid, {
          account: {
            username: "NicChappell",
          },
          contact: {
            firstName: "Nic",
            lastName: "Chappell",
            email: "nic.chappell@gmail.com",
            countryCode: "1",
            phone: "4029685985",
            streetAddress1: "971 Homer Circle",
            streetAddress2: "",
            city: "Lafayette",
            province: "CO",
            postalCode: "80026",
          },
          settings: {
            permissions: {
              location: true,
            },
            preferences: {
              shareCheckIns: true,
            },
          },
          createdAt: firebase.firestore.Timestamp.now(),
        });

        // authenticate user
        dispatch({ type: SIGN_UP, payload: { uid: user.uid } });
      }
    } catch (error) {
      const payload = { message: error.message };

      dispatch({ type: SET_ERROR, payload });
    }
  };
