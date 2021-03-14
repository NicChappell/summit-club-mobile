import { StackNavigationProp } from "@react-navigation/stack";

export interface IBasicDetailsCard {
  /** item data */
  item: any;
  /** contains various convenience functions that dispatch navigation actions */
  navigation: StackNavigationProp;
}
