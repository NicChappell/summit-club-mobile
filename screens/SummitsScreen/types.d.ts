import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ProfileStackParamList } from "../../navigation/navigators/ProfileStack/types";

export type SummitsScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Summits"
>;

export type SummitsScreenRouteProp = RouteProp<
  ProfileStackParamList,
  "Summits"
>;

export interface ISummitsScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: SummitsScreenNavigationProp;
  /** Contains various information regarding current route */
  route: SummitsScreenRouteProp;
}
