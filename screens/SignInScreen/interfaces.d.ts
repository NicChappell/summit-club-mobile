import { SignInScreenNavigationProp, SignInScreenRouteProp } from "./types";
import { IAuthCredentials, IError } from "../../common/interfaces";

export interface ISignInScreen {
  /** TODO */
  error: IError;
  /** TODO */
  navigation: SignInScreenNavigationProp;
  /** TODO */
  route: SignInScreenRouteProp;
  /** TODO */
  signIn: (authCredentials: IAuthCredentials) => void;
}
