import { MapScreenNavigationProp, MapScreenRouteProp } from "./types";

export interface IFeatureFilters {
  /** maximum elevation allowed */
  maxElevation: number;
  /** include features above 14,000' */
  above14: boolean;
  /** include features between 13,000' and 14,000' */
  between13and14: boolean;
  /** include features between 12,000' and 13,000' */
  between12and13: boolean;
  /** include features between 11,000' and 12,000' */
  between11and12: boolean;
  /** include features between 10,000' and 11,000' */
  between10and11: boolean;
  /** include features below 10,000' */
  below10: boolean;
}

export interface IMapScreen {
  /** TODO */
  navigation: MapScreenNavigationProp;
  /** TODO */
  route: MapScreenRouteProp;
}
