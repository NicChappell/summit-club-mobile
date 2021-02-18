import { Feature } from "geojson";
import { IUser } from "../../../../common/interfaces";

export interface ICheckIn {
  /** Check-in ID */
  id: string;
  /** User profile */
  user: IUser;
  /** Feature profile */
  feature: Feature;
  /** Timestamp */
  date: Date;
}
