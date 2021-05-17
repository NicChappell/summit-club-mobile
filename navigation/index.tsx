import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import Fuse from "fuse.js";
import { NavigationContainer } from "@react-navigation/native";
import { IError } from "../common/types";
import * as actions from "../redux/actions";
import { RootState } from "../redux/reducers";
import { IAuthState } from "../redux/reducers/children/authReducer/types";
import { IQueryResult, ISummitName, Summit, Trie, User } from "../services";
import { AuthStack, MainTabs } from "./navigators";

const Navigation = ({
  auth,
  checkAuthentication,
  setDatabase,
  setError,
  setFeaturesCollectionRef,
  setFuse,
  setSummitNames,
  setTrie,
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

    // set database
    const database = SQLite.openDatabase("summit_club");
    setDatabase(database);

    Summit.getSummitNames()
      .then((resultSet) => {
        // destructure ResultSet
        const { _array }: any = resultSet.rows;

        // process summit names into search objects
        const summitNames: ISummitName[] = _array.map(
          (result: Partial<IQueryResult>) => ({
            lowercase: result.name?.toLowerCase(),
            original: result.name,
          })
        );

        // configure Fuse options
        const fuseOptions = { keys: ["lowercase"] };

        // instantiate new Fuse
        const fuse = new Fuse(summitNames, fuseOptions);

        // instantiate new search Trie
        const trie = new Trie();

        // create new node for each summit name
        summitNames.forEach((summitName) => trie.add(summitName.lowercase));

        // update global state
        setFuse(fuse);
        setSummitNames(summitNames);
        setTrie(trie);
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
  setDatabase: actions.setDatabase,
  setError: actions.setError,
  setFeaturesCollectionRef: actions.setFeaturesCollectionRef,
  setFuse: actions.setFuse,
  setSummitNames: actions.setSummitNames,
  setTrie: actions.setTrie,
  setUser: actions.setUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
