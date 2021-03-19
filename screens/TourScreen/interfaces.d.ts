import { TourScreenNavigationProp, TourScreenRouteProp } from "./types";

export interface ITourScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: TourScreenNavigationProp;
  /** Contains various information regarding current route */
  route: TourScreenRouteProp;
}
