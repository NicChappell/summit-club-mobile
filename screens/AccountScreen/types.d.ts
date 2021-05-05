import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ProfileStackParamList } from "../../navigation/navigators/ProfileStack/types";

export type AccountScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Account"
>;

export type AccountScreenRouteProp = RouteProp<
  ProfileStackParamList,
  "Account"
>;

export interface IAccountScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: AccountScreenNavigationProp;
  /** Contains various information regarding current route */
  route: AccountScreenRouteProp;
}
