import { ICheckIn } from "../../../../services/CheckIn";

export interface ICheckInsState {
  /** Array of recent check-in data */
  recentCheckIns?: ICheckIn[];
}
