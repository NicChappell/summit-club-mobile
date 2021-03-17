import { ICollection, IFeaturedSummit } from "../../../../../services";

export interface IBackground {
  /** item data */
  item: ICollection | IFeaturedSummit;
}
