import { SignUpScreenNavigationProp, SignUpScreenRouteProp } from "./types";

export interface ISignUpScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: SignUpScreenNavigationProp;
  /** contains various information regarding current route */
  route: SignUpScreenRouteProp;
}
