import { StackNavigationProp } from "@react-navigation/stack";

export interface IStackNavigatorControl {
  /** name of the route */
  name: string;
  /** object of convenience functions to dispatch navigation actions */
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
  /** boolean indicating ability to navigate backwards */
  previousScreen: boolean;
}
