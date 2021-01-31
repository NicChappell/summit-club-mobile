import { WebSQLDatabase } from "expo-sqlite";
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
