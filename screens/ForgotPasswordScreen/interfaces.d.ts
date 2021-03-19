import {
  ForgotPasswordScreenNavigationProp,
  ForgotPasswordScreenRouteProp,
} from "./types";

export interface IForgotPasswordScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: ForgotPasswordScreenNavigationProp;
  /** Contains various information regarding current route */
  route: ForgotPasswordScreenRouteProp;
}
