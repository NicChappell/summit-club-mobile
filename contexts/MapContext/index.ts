import React from "react";
import { IMapContext } from "./interfaces";

// set default values
const MapContext = React.createContext<IMapContext>({
  featuresDatabase: undefined,
  feature: undefined,
  features: undefined,
  featuresCollectionRef: undefined,
  setFeature: () => {},
  setFeatures: () => {},
});

export default MapContext;
