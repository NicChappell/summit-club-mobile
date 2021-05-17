import { defaultFeatureFilters } from "../../../../common/constants";

import { IFeaturesState } from "./types";

export const initState: IFeaturesState = {
  feature: undefined,
  featureFilters: defaultFeatureFilters,
  features: undefined,
  featuresCollectionRef: undefined,
};
