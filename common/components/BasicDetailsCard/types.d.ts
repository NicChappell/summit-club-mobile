import { ICollection, ISummit } from "../../../services";

export interface IBasicDetailsCard {
  /** Custom card dimensions */
  dimensions?: { height: number | string; width: number | string };
  /** Item data */
  item: ICollection | ISummit;
}
