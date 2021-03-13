import { TourScreenNavigationProp, TourScreenRouteProp } from "./types";

export interface ITourScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: TourScreenNavigationProp;
  /** contains various information regarding current route */
  route: TourScreenRouteProp;
}
