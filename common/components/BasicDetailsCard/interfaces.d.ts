import { StackNavigationProp } from "@react-navigation/stack";

export interface IBasicDetailsCard {
  /** custom card dimensions */
  dimensions?: { height: number; width: number };
  /** item data */
  item: any;
  /** contains various convenience functions that dispatch navigation actions */
  navigation: StackNavigationProp;
}
