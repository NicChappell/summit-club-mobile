import { SignUpScreenNavigationProp, SignUpScreenRouteProp } from "./types";

export interface ISignUpScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SignUpScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SignUpScreenRouteProp;
}
