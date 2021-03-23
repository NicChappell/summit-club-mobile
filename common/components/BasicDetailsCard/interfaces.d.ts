import { ICollection, IFeaturedSummit } from "../../../services";

export interface IBasicDetailsCard {
  /** Custom card dimensions */
  dimensions?: { height: number | string; width: number | string };
  /** Item data */
  item: ICollection | IFeaturedSummit;
}
