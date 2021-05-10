import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import { IError } from "../common/types";
import * as actions from "../redux/actions";
import { RootState } from "../redux/reducers";
import { IAuthState } from "../redux/reducers/children/authReducer/types";
import { IQueryResult, Summit, Trie, User } from "../services";
import { AuthStack, MainTabs } from "./navigators";

const Navigation = ({
  auth,
  checkAuthentication,
  setError,
  setFeaturesCollectionRef,
  setFeaturesDatabase,
  setUser,
}: PropsFromRedux) => {
  // destructure auth
  const { uid } = auth;

  // effect hooks
  useEffect(() => {
    // check if user is already authenticated
    checkAuthentication();

    // set features collection ref
    const featuresCollectionRef = firebase.firestore().collection("features");
    setFeaturesCollectionRef(featuresCollectionRef);

    // set database ref
    const databaseRef = SQLite.openDatabase("summit_club");
    setFeaturesDatabase(databaseRef);

    Summit.getSummitNames()
      .then((resultSet) => {
        // destructure ResultSet
        const { _array }: any = resultSet.rows;

        const summitNames = _array.map(
          (result: Partial<IQueryResult>) => result.name
        );

        const trie = new Trie();

        summitNames.forEach((summitName: string) =>
          trie.add(summitName.toLowerCase())
        );
        console.log(trie);

        const suggestions = trie.complete("gr", 6); // A,E,I,O,U & Y
        console.log(suggestions);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });
  }, []);

  let navigator;
  if (uid) {
    User.get(uid)
      .then((user) => {
        setUser(user);
      })
      .catch((error: IError) => {
        setError({
          code: error.code,
          message: error.message,
        });
      });

    // use authenticated navigator
    navigator = <MainTabs />;
  } else {
    // use unauthenticated navigator
    navigator = <AuthStack />;
  }

  return <NavigationContainer>{navigator}</NavigationContainer>;
};

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth as IAuthState,
  };
};

const mapDispatchToProps = {
  checkAuthentication: actions.checkAuthentication,
  setError: actions.setError,
  setFeaturesCollectionRef: actions.setFeaturesCollectionRef,
  setFeaturesDatabase: actions.setFeaturesDatabase,
  setUser: actions.setUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
