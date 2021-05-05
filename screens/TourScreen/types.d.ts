import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { HomeTabsParamList } from "../../navigation/navigators/HomeTabs/types";

export type TourScreenNavigationProp = BottomTabNavigationProp<
  HomeTabsParamList,
  "Tour"
>;

export type TourScreenRouteProp = RouteProp<HomeTabsParamList, "Tour">;

export interface ITourScreen {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: TourScreenNavigationProp;
  /** Contains various information regarding current route */
  route: TourScreenRouteProp;
}
