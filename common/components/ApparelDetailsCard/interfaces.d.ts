import { IApparel } from "../../../services";

export interface IApparelDetailsCard {
  /** Custom card dimensions */
  dimensions?: { height: number | string; width: number | string };
  /** Card data */
  item: IApparel;
}
