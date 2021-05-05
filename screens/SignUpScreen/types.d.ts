import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/navigators/AuthStack/types";

export type SignUpScreenNavigationProp = BottomTabNavigationProp<
  AuthStackParamList,
  "SignUp"
>;

export type SignUpScreenRouteProp = RouteProp<AuthStackParamList, "SignUp">;

export interface ISignUpScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SignUpScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SignUpScreenRouteProp;
}
