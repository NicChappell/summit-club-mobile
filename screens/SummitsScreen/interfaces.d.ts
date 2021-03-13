import { SummitsScreenNavigationProp, SummitsScreenRouteProp } from "./types";

export interface ISummitsScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: SummitsScreenNavigationProp;
  /** contains various information regarding current route */
  route: SummitsScreenRouteProp;
}
