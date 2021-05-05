import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ProfileStackParamList } from "../../navigation/navigators/ProfileStack/types";

export type ContactScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Contact"
>;

export type ContactScreenRouteProp = RouteProp<
  ProfileStackParamList,
  "Contact"
>;

export interface IContactScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: ContactScreenNavigationProp;
  /** Contains various information regarding current route */
  route: ContactScreenRouteProp;
}
