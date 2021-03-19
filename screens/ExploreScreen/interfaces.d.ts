import { ExploreScreenNavigationProp, ExploreScreenRouteProp } from "./types";

export interface IExploreScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: ExploreScreenNavigationProp;
  /** Contains various information regarding current route */
  route: ExploreScreenRouteProp;
}
