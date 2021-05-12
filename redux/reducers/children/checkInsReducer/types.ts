import { ICheckIn } from "../../../../services";

export interface ICheckInsState {
  /** Array of recent check-in data */
  recentCheckIns?: ICheckIn[];
}
