import { BlankScreenNavigationProp, BlankScreenRouteProp } from "./types";

export interface IBlankScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: BlankScreenNavigationProp;
  /** Contains various information regarding current route */
  route: BlankScreenRouteProp;
}
