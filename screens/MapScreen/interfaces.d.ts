import { MapScreenNavigationProp, MapScreenRouteProp } from "./types";

export interface IMapScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: MapScreenNavigationProp;
  /** contains various information regarding current route */
  route: MapScreenRouteProp;
}
