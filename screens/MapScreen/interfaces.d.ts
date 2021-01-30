import { FeatureCollection } from "geojson";
import { MapScreenNavigationProp, MapScreenRouteProp } from "./types";

export interface IMapScreen {
  /** TODO */
  navigation: MapScreenNavigationProp;
  /** TODO */
  route: MapScreenRouteProp;
}

export interface IMarkers {
  /** TODO */
  featureCollection: FeatureCollection | undefined;
  /** TODO */
  navigation: MapScreenNavigationProp;
}

export interface ISQLResult {
  /** TODO */
  difficulty: string;
  /** TODO */
  distanceMiles: string;
  /** TODO */
  elevationFeet: string;
  /** TODO */
  elevationGainFeet: string;
  /** TODO */
  fourteener: boolean;
  /** TODO */
  latitude: string;
  /** TODO */
  longitude: string;
  /** TODO */
  mountainPeak: string;
  /** TODO */
  mountainRange: string;
  /** TODO */
  photo: string;
}
