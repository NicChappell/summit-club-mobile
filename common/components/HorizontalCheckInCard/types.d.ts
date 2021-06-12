import { ICheckInResult } from "../../../services";

export interface IHorizontalCheckInCard {
  /** Custom card dimensions */
  dimensions?: { height: number | string; width: number | string };
  /** Card data */
  item: ICheckInResult;
}
