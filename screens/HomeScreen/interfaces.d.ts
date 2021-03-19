import { HomeScreenNavigationProp, HomeScreenRouteProp } from "./types";

export interface IHomeScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: HomeScreenNavigationProp;
  /** Contains various information regarding current route */
  route: HomeScreenRouteProp;
}
