import { StackNavigationProp } from "@react-navigation/stack";
import { ICollection, IFeaturedSummit } from "../../../services";

export interface IBasicDetailsCard {
  /** Custom card dimensions */
  dimensions?: { height: number | string; width: number | string };
  /** Item data */
  item: ICollection | IFeaturedSummit;
  /** Contains various convenience functions that dispatch navigation actions */
  navigation: StackNavigationProp;
}
