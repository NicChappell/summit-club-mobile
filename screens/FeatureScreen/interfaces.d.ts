import { FeatureScreenNavigationProp, FeatureScreenRouteProp } from "./types";

export interface IFeatureScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: FeatureScreenNavigationProp;
  /** contains various information regarding current route */
  route: FeatureScreenRouteProp;
}
