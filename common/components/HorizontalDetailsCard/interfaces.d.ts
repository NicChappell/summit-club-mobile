import { ICheckIn, ISummit } from "../../../services";

export interface IHorizontalDetailsCard {
  /** Custom card dimensions */
  dimensions?: { height: number | string; width: number | string };
  /** Card data */
  item: ICheckIn | ISummit;
}
