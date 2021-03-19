import { SummitsScreenNavigationProp, SummitsScreenRouteProp } from "./types";

export interface ISummitsScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SummitsScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SummitsScreenRouteProp;
}
