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

    // // STEP 0:
    // // drop database table to reset
    // CheckIn.dropTable()
    //   .then(() => {
    //     console.log("check_in table dropped");
    //   })
    //   .catch((error) => {
    //     setError({ message: error.message });
    //   });

    // // STEP 0:
    // // drop database table to reset
    // CheckOff.dropTable()
    //   .then(() => {
    //     console.log("check_off table dropped");
    //   })
    //   .catch(() => {
    //     setError({ message: error.message });
    //   });

    // // STEP 0:
    // // drop database table to reset
    // Feature.dropTable()
    //   .then((resultSet) => {
    //     console.log("dropTable(): ", resultSet);
    //   })
    //   .catch(() => {
    //     setError({ message: error.message });
    //   });

    setStatusMessage("Checking offline data");

    // STEP 1:
    // create database table if it does not exist
    CheckIn.createTable()
      .then(() => {
        console.log("check_in table created");
      })
      .catch((error) => {
        setError({ message: error.message });
      });

    // STEP 1:
    // create database table if it does not exist
    CheckOff.createTable()
      .then((resultSet) => {
        // console.log("createTable(): ", resultSet);
      })
      .catch((error) => {
        setError({ message: error.message });
      });

    // STEP 1:
    // create database table if it does not exist
    Feature.createTable()
      .then((resultSet) => {
        // STEP 2:
        // get feature table row count
        return Feature.countRows();
      })
      .then((count) => {
        // fetch features if feature table is empty
        //   Boolean(0) === false
        //   Boolean(1+) === true
        if (Boolean(count)) {
          setFeaturesLoaded(true);
          setStatusMessage(`${count.toLocaleString()} summits found`);
        } else {
          setFetchFeatures(true);
        }
      })
      .catch((error) => {
        setError({ message: error.message });
      });

    Summit.getSummitNames()
      .then((resultSet) => {
        // destructure result set
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
      .catch((error) => {
        setError({ message: error.message });
      });
  }, []);

  useEffect(() => {
    if (fetchFeatures) {
      setStatusMessage("Retreiving data");

      // STEP 3:
      // fetch feature documents from Firestore
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
          setFetchFeatures(false);
          setStatusMessage(`${count.toLocaleString()} summits found`);
        })
        .catch((error) => {
          setError({ message: error.message });
        });
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
    auth: state.auth,
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
