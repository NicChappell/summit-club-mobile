import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { HomeStackParamList } from "../../navigation/navigators/HomeStack/types";

export type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "Home"
>;

export type HomeScreenRouteProp = RouteProp<HomeStackParamList, "Home">;

export interface IHomeScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: HomeScreenNavigationProp;
  /** Contains various information regarding current route */
  route: HomeScreenRouteProp;
}
