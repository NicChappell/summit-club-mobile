export type TourStatus = "complete";

export interface IAccountState {
  /** firebase user id */
  tourStatus?: TourStatus;
}
