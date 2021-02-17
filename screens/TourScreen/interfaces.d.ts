import { TourScreenNavigationProp, TourScreenRouteProp } from "./types";

export interface ITourScreen {
  /** TODO */
  completeTour: () => void;
  /** TODO */
  navigation: TourScreenNavigationProp;
  /** TODO */
  route: TourScreenRouteProp;
}

export interface ITourSlide {
  /** TODO */
  id: number;
  /** TODO */
  text: string;
  /** TODO */
  color: string;
}
