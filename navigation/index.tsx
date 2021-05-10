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
  setError,
  setFeaturesCollectionRef,
  setFeaturesDatabase,
  setFuse,
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

    // set database ref
    const databaseRef = SQLite.openDatabase("summit_club");
    setFeaturesDatabase(databaseRef);

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
        const fuseOptions = {
          // isCaseSensitive: false,
          includeScore: false,
          shouldSort: true,
          // includeMatches: false,
          // findAllMatches: false,
          // minMatchCharLength: 1,
          // location: 0,
          // threshold: 0.6,
          // distance: 100,
          // useExtendedSearch: false,
          // ignoreLocation: false,
          // ignoreFieldNorm: false,
          keys: ["lowercase"],
        };

        // instantiate new Fuse
        const fuse = new Fuse(summitNames, fuseOptions);

        // instantiate new search Trie
        const trie = new Trie();

        // create new node for each summit name
        summitNames.forEach((summitName) => trie.add(summitName.lowercase));

        // update global state
        setFuse(fuse);
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
  setError: actions.setError,
  setFeaturesCollectionRef: actions.setFeaturesCollectionRef,
  setFeaturesDatabase: actions.setFeaturesDatabase,
  setFuse: actions.setFuse,
  setTrie: actions.setTrie,
  setUser: actions.setUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigation);
