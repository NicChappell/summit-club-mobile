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

export interface IFeaturedLandmarkSlide {
  /** TODO */
  id: string;
  /** TODO */
  title: string;
  /** TODO */
  image: string;
}
