import { ISummit, IPopularSummit } from "../../../../services";

export interface ISummitsState {
  /** Array of popular summit data */
  popularSummits?: IPopularSummit;
  /** Array of featured summit profiles */
  featuredSummits?: ISummit;
}
