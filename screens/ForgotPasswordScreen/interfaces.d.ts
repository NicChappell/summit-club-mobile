import {
  ForgotPasswordScreenNavigationProp,
  ForgotPasswordScreenRouteProp,
} from "./types";

export interface IForgotPasswordScreen {
  /** contains various convenience functions that dispatch navigation actions */
  navigation: ForgotPasswordScreenNavigationProp;
  /** contains various information regarding current route */
  route: ForgotPasswordScreenRouteProp;
}
