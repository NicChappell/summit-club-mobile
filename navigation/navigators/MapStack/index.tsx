import * as React from "react";
import { WebSQLDatabase } from "expo-sqlite";
import { createStackNavigator } from "@react-navigation/stack";
import { ISQLResult } from "../../../common/interfaces";
import { MapContext } from "../../../contexts";
import { FeatureScreen, MapScreen } from "../../../screens";
import { openDatabase } from "./helpers";
import { MapStackParamList } from "./types";

// new stack navigator
const Stack = createStackNavigator<MapStackParamList>();

const MapStack = () => {
  // state hooks
  const [database, setDatabase] = React.useState<WebSQLDatabase | undefined>(
    undefined
  );
  const [feature, setFeature] = React.useState<ISQLResult | undefined>(
    undefined
  );

  // context provider value
  const value = {
    database,
    feature,
    openDatabase,
    setDatabase,
    setFeature,
  };

  return (
    <MapContext.Provider value={value}>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Feature" component={FeatureScreen} />
      </Stack.Navigator>
    </MapContext.Provider>
  );
};

export default MapStack;
