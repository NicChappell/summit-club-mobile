import { ExploreScreenNavigationProp, ExploreScreenRouteProp } from "./types";

export interface IExploreScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: ExploreScreenNavigationProp;
  /** contains various information regarding current route */
  route: ExploreScreenRouteProp;
}
