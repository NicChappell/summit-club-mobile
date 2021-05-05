import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";

export interface ITabNavigationHeader {
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: BottomTabNavigationProp;
  /** Contains various information regarding current route */
  route: RouteProp;
}
