import { MapScreenNavigationProp, MapScreenRouteProp } from "./types";

export interface IMapScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: MapScreenNavigationProp;
  /** Contains various information regarding current route */
  route: MapScreenRouteProp;
}
