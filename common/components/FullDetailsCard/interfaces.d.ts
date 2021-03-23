import { IPopularSummit } from "../../../services";

export interface IFullDetailsCard {
  /** Custom card dimensions */
  dimensions?: { height: number | string; width: number | string };
  /** Item data */
  item: IPopularSummit;
}
