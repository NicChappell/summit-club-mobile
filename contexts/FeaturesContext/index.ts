import React from "react";
import { IFeatureContext } from "../interfaces";

// set default values
const FeaturesContext = React.createContext<IFeatureContext>({
  feature: undefined,
  featureFilters: undefined,
  features: undefined,
  featuresDatabase: undefined,
  featuresCollectionRef: undefined,
  setFeature: () => {},
  setFeatures: () => {},
  setFeatureFilters: () => {},
});

export default FeaturesContext;
