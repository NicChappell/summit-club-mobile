import { FeatureScreenNavigationProp, FeatureScreenRouteProp } from "./types";

export interface IFeatureScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: FeatureScreenNavigationProp;
  /** Contains various information regarding current route */
  route: FeatureScreenRouteProp;
}
