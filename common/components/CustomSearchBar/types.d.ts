import { StackNavigationProp } from "@react-navigation/stack";

export interface ICustomSearchBar {
  /** object of convenience functions to dispatch navigation actions */
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
}
