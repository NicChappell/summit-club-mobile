import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/navigators/AuthStack/types";

export type SignInScreenNavigationProp = BottomTabNavigationProp<
  AuthStackParamList,
  "SignIn"
>;

export type SignInScreenRouteProp = RouteProp<AuthStackParamList, "SignIn">;

export interface ISignInScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SignInScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SignInScreenRouteProp;
}
