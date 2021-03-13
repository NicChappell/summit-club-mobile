import { AccountScreenNavigationProp, AccountScreenRouteProp } from "./types";

export interface IAccountScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: AccountScreenNavigationProp;
  /** contains various information regarding current route */
  route: AccountScreenRouteProp;
}
