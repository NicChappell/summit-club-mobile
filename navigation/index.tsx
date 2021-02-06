import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../reducers";
import { AuthStack, MainTabs } from "./navigators";

const Navigation = ({ auth }: PropsFromRedux) => {
  // destructure auth
  const { idToken } = auth;

  let navigator;
  if (idToken) {
    navigator = <MainTabs />;
  } else {
    navigator = <AuthStack />;
  }

  return <NavigationContainer>{navigator}</NavigationContainer>;
};

const mapStateToProps = ({ auth }: RootState) => {
  return { auth };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
