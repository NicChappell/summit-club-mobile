import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export interface ITabNavigationHeader {
  /** object of convenience functions to dispatch navigation actions */
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
}
