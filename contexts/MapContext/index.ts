import React from "react";
import { IMapContext } from "./interfaces";

// set default values
const MapContext = React.createContext<IMapContext>({
  database: undefined,
  executeSql: () => {},
  feature: undefined,
  features: undefined,
  featuresRef: undefined,
  setFeature: () => {},
  setFeatures: () => {},
});

export default MapContext;
