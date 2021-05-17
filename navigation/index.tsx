import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  useFonts,
  NotoSansJP_100Thin,
  NotoSansJP_300Light,
  NotoSansJP_400Regular,
  NotoSansJP_500Medium,
  NotoSansJP_700Bold,
  NotoSansJP_900Black,
} from "@expo-google-fonts/noto-sans-jp";
import {
  NunitoSans_200ExtraLight,
  NunitoSans_200ExtraLight_Italic,
  NunitoSans_300Light,
  NunitoSans_300Light_Italic,
  NunitoSans_400Regular,
  NunitoSans_400Regular_Italic,
  NunitoSans_600SemiBold,
  NunitoSans_600SemiBold_Italic,
  NunitoSans_700Bold,
  NunitoSans_700Bold_Italic,
  NunitoSans_800ExtraBold,
  NunitoSans_800ExtraBold_Italic,
  NunitoSans_900Black,
  NunitoSans_900Black_Italic,
} from "@expo-google-fonts/nunito-sans";
import Fuse from "fuse.js";
import { NavigationContainer } from "@react-navigation/native";
import { IError } from "../common/types";
import * as actions from "../redux/actions";
import { RootState } from "../redux/reducers";
import { IAuthState } from "../redux/reducers/children/authReducer/types";
import { IQueryResult, ISummitName, Summit, Trie, User } from "../services";
import { AppLoading } from "./components";
import { AuthStack, MainTabs } from "./navigators";

const Navigator = ({
  auth,
  checkAuthentication,
  setError,
  setFuse,
  setSummitNames,
  setTrie,
  setUser,
}: PropsFromRedux) => {
  // destructure auth
  const { uid } = auth;

  // font hooks
  const [didFontsLoad, fontsLoadingError] = useFonts({
    NotoSansJP_100Thin,
    NotoSansJP_300Light,
    NotoSansJP_400Regular,
    NotoSansJP_500Medium,
    NotoSansJP_700Bold,
    NotoSansJP_900Black,
    NunitoSans_200ExtraLight,
    NunitoSans_200ExtraLight_Italic,
    NunitoSans_300Light,
    NunitoSans_300Light_Italic,
    NunitoSans_400Regular,
    NunitoSans_400Regular_Italic,
    NunitoSans_600SemiBold,
    NunitoSans_600SemiBold_Italic,
    NunitoSans_700Bold,
    NunitoSans_700Bold_Italic,
    NunitoSans_800ExtraBold,
    NunitoSans_800ExtraBold_Italic,
    NunitoSans_900Black,
    NunitoSans_900Black_Italic,
  });

  // effect hooks
  useEffect(() => {
    // check if user is already authenticated
    checkAuthentication();

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

  if (didFontsLoad) {
    return <NavigationContainer>{navigator}</NavigationContainer>;
  } else {
    setError({ message: fontsLoadingError?.message });

    return <AppLoading />;
  }
};

const mapStateToProps = (state: RootState) => {
  return {
    auth: state.auth as IAuthState,
  };
};

const mapDispatchToProps = {
  checkAuthentication: actions.checkAuthentication,
  setError: actions.setError,
  setFuse: actions.setFuse,
  setSummitNames: actions.setSummitNames,
  setTrie: actions.setTrie,
  setUser: actions.setUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navigator);
