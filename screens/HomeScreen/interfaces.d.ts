import { HomeScreenNavigationProp, HomeScreenRouteProp } from "./types";

export interface IHomeScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: HomeScreenNavigationProp;
  /** contains various information regarding current route */
  route: HomeScreenRouteProp;
}
