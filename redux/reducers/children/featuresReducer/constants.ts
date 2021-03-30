import { defaultFeatureFilters } from "../../../../common/constants";

import { IFeaturesState } from "./interfaces";

export const initState: IFeaturesState = {
  feature: undefined,
  featureFilters: defaultFeatureFilters,
  features: undefined,
  featuresDatabase: undefined,
  featuresCollectionRef: undefined,
};
