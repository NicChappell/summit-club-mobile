import { ISummit } from "../../../services";

export interface IVerticalDetailsCard {
  /** Custom card dimensions */
  dimensions?: {
    height: number | string;
    width: number | string;
  };
  /** Card data */
  item: ISummit;
}
