import React, { useEffect, useState } from "react";
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
import {
  CheckIn,
  CheckOff,
  Feature,
  IQueryResult,
  ISummitName,
  Summit,
  Trie,
  User,
} from "../services";
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

  // state hooks
  const [featuresLoaded, setFeaturesLoaded] = useState<boolean>(false);
  const [fetchFeatures, setFetchFeatures] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>("");

  // font hooks
  const [fontsLoaded, fontsLoadingError] = useFonts({
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

    // STEP 0:
    // // drop check_off table to reset
    // CheckOff.dropTable().then((resultSet) => {
    //   console.log("dropTable(): ", resultSet);
    // });

    // // drop feature table to reset
    // Feature.dropTable().then((resultSet) => {
    //   console.log("dropTable(): ", resultSet);
    // });

    setStatusMessage("Checking offline data");

    // STEP 1:
    // create check_in table if it does not exist
    CheckIn.createTable()
      .then((resultSet) => {
        // console.log("createTable(): ", resultSet);
      })
      .catch((error: Error) => {
        setError({ message: error.message });
      });

    // STEP 1:
    // create check_off table if it does not exist
    CheckOff.createTable()
      .then((resultSet) => {
        // console.log("createTable(): ", resultSet);
      })
      .catch((error: Error) => {
        setError({ message: error.message });
      });

    // STEP 1:
    // create feature table if it does not exist
    Feature.createTable()
      .then((resultSet) => {
        // STEP 2:
        // get feature table row count
        return Feature.countRows();
      })
      .then((count) => {
        // fetch features if feature table empty
        //   Boolean(!0) === true
        //   Boolean(!1+) === false
        if (Boolean(!count)) {
          setFetchFeatures(true);
        } else {
          setFeaturesLoaded(true);
          setStatusMessage(`${count.toLocaleString()} summits found`);
        }
      })
      .catch((error: Error) => {
        setError({ message: error.message });
      });

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
          includeMatches: true,
          keys: ["lowercase"],
          threshold: 0.2,
        };

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
      .catch((error: Error) => {
        setError({ message: error.message });
      });
  }, []);

  useEffect(() => {
    if (fetchFeatures) {
      setStatusMessage("Retreiving data");

      // STEP 3:
      // fetch features from firestore
      Feature.retreiveFeatureDocuments()
        .then((documents) => {
          console.log("retreiveFeatureDocuments(): ", documents?.length);

          setStatusMessage("Building offline data");

          // STEP 4:
          // save features to feature table
          return Feature.populateFeatureTable(documents!);
        })
        .then((count) => {
          console.log("populateFeatureTable(): ", count);

          setFeaturesLoaded(true);
          setStatusMessage(`${count.toLocaleString()} summits found`);
        })
        .catch((error: Error) => {
          setError({ message: error.message });
        });
    } else {
    }
  }, [fetchFeatures]);

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

  if (featuresLoaded && fontsLoaded) {
    return <NavigationContainer>{navigator}</NavigationContainer>;
  } else {
    return <AppLoading statusMessage={statusMessage} />;
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
