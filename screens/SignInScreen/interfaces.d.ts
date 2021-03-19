import { SignInScreenNavigationProp, SignInScreenRouteProp } from "./types";

export interface ISignInScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SignInScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SignInScreenRouteProp;
}
