import { HomeScreenNavigationProp, HomeScreenRouteProp } from "./types";

export interface IHomeScreen {
  /** TODO */
  navigation: HomeScreenNavigationProp;
  /** TODO */
  resetTour: () => void;
  /** TODO */
  route: HomeScreenRouteProp;
  /** TODO */
  signOut: () => void;
}
