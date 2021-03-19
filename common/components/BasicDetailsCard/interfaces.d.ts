import { StackNavigationProp } from "@react-navigation/stack";
import { ICollection, IFeaturedSummit } from "../../../services";

export interface IBasicDetailsCard {
  /** custom card dimensions */
  dimensions?: { height: number; width: number };
  /** item data */
  item: ICollection | IFeaturedSummit;
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: StackNavigationProp;
}
