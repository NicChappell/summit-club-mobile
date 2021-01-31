import React from "react";
import { WebSQLDatabase } from "expo-sqlite";
import { IMapContext } from "./interfaces";

// set default values
const MapContext = React.createContext<IMapContext>({
  database: undefined,
  feature: undefined,
  openDatabase: () => new Promise<WebSQLDatabase>(() => {}),
  setDatabase: () => {},
  setFeature: () => {},
});

export default MapContext;
