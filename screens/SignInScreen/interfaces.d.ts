import { SignInScreenNavigationProp, SignInScreenRouteProp } from "./types";

export interface ISignInScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: SignInScreenNavigationProp;
  /** contains various information regarding current route */
  route: SignInScreenRouteProp;
}
