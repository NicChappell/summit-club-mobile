import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { connect, ConnectedProps } from "react-redux";
import * as actions from "../actions";
import { RootState } from "../reducers";
import { AuthStack, MainTabs } from "./navigators";

const Navigation = ({ checkAuthentication, auth }: PropsFromRedux) => {
  // destructure auth
  const { uid } = auth;

  // effect hooks
  useEffect(() => {
    // check if user is already authenticated
    checkAuthentication();
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

const mapStateToProps = ({ auth }: RootState) => {
  return { auth };
};

const mapDispatchToProps = { checkAuthentication: actions.checkAuthentication };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
