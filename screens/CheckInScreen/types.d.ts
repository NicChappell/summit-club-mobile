import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { FeatureStackParamList } from "../../navigation/navigators/FeatureStack/types";

export type CheckInScreenNavigationProp = StackNavigationProp<
  FeatureStackParamList,
  "CheckIn"
>;

export type CheckInScreenRouteProp = RouteProp<
  FeatureStackParamList,
  "CheckIn"
>;

export interface ICheckInScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: CheckInScreenNavigationProp;
  /** Contains various information regarding current route */
  route: CheckInScreenRouteProp;
}
