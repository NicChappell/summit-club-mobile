import { ISummit, IPopularSummit, IUserSummit } from "../../../../services";

export interface ISummitsState {
  /** Array of featured summit profiles */
  featuredSummits?: ISummit[];
  /** Array of popular summit data */
  popularSummits?: IPopularSummit[];
  /** Array of User's summit data */
  userSummits?: IUserSummit[];
}
