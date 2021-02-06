import { SignUpScreenNavigationProp, SignUpScreenRouteProp } from "./types";
import { IAuthCredentials, IError } from "../../common/interfaces";

export interface ISignUpScreen {
  /** TODO */
  error: IError;
  /** TODO */
  navigation: SignUpScreenNavigationProp;
  /** TODO */
  route: SignUpScreenRouteProp;
  /** TODO */
  signUp: (authCredentials: IAuthCredentials) => void;
}
