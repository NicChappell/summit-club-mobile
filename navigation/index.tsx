import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { NavigationContainer } from "@react-navigation/native";
import * as actions from "../redux/actions";
import { RootState } from "../redux/reducers";
import { AuthStack, MainTabs } from "./navigators";

const Navigation = ({
  auth,
  checkAuthentication,
  setFeaturesCollectionRef,
  setFeaturesDatabase,
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

    // set features database
    const featuresDatabase = SQLite.openDatabase("features");
    setFeaturesDatabase(featuresDatabase);
  }, []);

  let navigator;
  if (uid) {
    // authenticated navigator
    navigator = <MainTabs />;
  } else {
    // unauthenticated navigator
    navigator = <AuthStack />;
  }

  return <NavigationContainer>{navigator}</NavigationContainer>;
};

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth,
    featuresDatabase: state.features.featuresDatabase,
    featuresCollectionRef: state.features.featuresCollectionRef,
  };
};

const mapDispatchToProps = {
  checkAuthentication: actions.checkAuthentication,
  setFeaturesCollectionRef: actions.setFeaturesCollectionRef,
  setFeaturesDatabase: actions.setFeaturesDatabase,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
