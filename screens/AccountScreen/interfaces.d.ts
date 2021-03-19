import { AccountScreenNavigationProp, AccountScreenRouteProp } from "./types";

export interface IAccountScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: AccountScreenNavigationProp;
  /** Contains various information regarding current route */
  route: AccountScreenRouteProp;
}
