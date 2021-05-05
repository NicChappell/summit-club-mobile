import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ProfileStackParamList } from "../../navigation/navigators/ProfileStack/types";

export type ProfileScreenNavigationProp = BottomTabNavigationProp<
  ProfileStackParamList,
  "Profile"
>;

export type ProfileScreenRouteProp = RouteProp<
  ProfileStackParamList,
  "Profile"
>;

export interface IProfileScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: ProfileScreenNavigationProp;
  /** Contains various information regarding current route */
  route: ProfileScreenRouteProp;
}
