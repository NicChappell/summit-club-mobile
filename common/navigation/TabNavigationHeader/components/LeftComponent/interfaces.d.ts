import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export interface ILeftComponent {
  /** name of the route */
  name: string;
  /** object of convenience functions to dispatch navigation actions */
  navigation: BottomTabNavigationProp<Record<string, object | undefined>, string>;
  /** boolean indicating ability to navigate backwards */
  previousScreen: boolean;
}
