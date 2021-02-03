import { SignUpScreenNavigationProp, SignUpScreenRouteProp } from "./types";
import { IAuthCredentials } from "../../common/interfaces";

export interface ISignUpScreen {
  /** TODO */
  navigation: SignUpScreenNavigationProp;
  /** TODO */
  route: SignUpScreenRouteProp;
  /** TODO */
  signUp: (authCredentials: IAuthCredentials) => void;
}
