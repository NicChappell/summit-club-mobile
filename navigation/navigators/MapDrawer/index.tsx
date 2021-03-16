import React, { useState } from "react";
import * as SQLite from "expo-sqlite";
import firebase from "firebase/app";
import "firebase/firestore";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerNavigatorContent } from "../../../common/navigation";
import { FeaturesContext } from "../../../contexts/";
import { IMapFilters } from "../../../contexts/interfaces";
import MapStack from "../MapStack";
import { initMapFilters } from "./constants";

// new drawer navigator
const Drawer = createDrawerNavigator();

const MapDrawer = () => {
  // state hooks
  const [feature, setFeature] = useState<
    Feature<Geometry, GeoJsonProperties> | undefined
  >(undefined);
  const [featureFilters, setFeatureFilters] = useState<IMapFilters>(
    initMapFilters
  );
  const [features, setFeatures] = useState<
    Feature<Geometry, GeoJsonProperties>[] | undefined
  >(undefined);

  const featuresDatabase = SQLite.openDatabase("features");
  const featuresCollectionRef = firebase.firestore().collection("features");

  // context provider value
  const value = {
    feature,
    featureFilters,
    features,
    featuresDatabase,
    featuresCollectionRef,
    setFeature,
    setFeatures,
    setFeatureFilters,
  };

  return (
    <FeaturesContext.Provider value={value}>
      <Drawer.Navigator
        drawerContent={(props) => <DrawerNavigatorContent {...props} />}
        screenOptions={{ swipeEnabled: false }}
      >
        <Drawer.Screen name="MapStack" component={MapStack} />
      </Drawer.Navigator>
    </FeaturesContext.Provider>
  );
};

export default MapDrawer;
