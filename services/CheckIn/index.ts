import { Feature } from "geojson";
import { IUser } from "../../services/User";
import { MOCK_FEATURE, MOCK_USER } from "../../data/mocks";

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

class CheckIn {
  /** Fetch array of recent check-in data */
  static getRecentCheckIns(): Promise<ICheckIn[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: "0",
          user: MOCK_USER,
          feature: MOCK_FEATURE,
          date: new Date(),
        },
        {
          id: "1",
          user: MOCK_USER,
          feature: MOCK_FEATURE,
          date: new Date(),
        },
        {
          id: "2",
          user: MOCK_USER,
          feature: MOCK_FEATURE,
          date: new Date(),
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default CheckIn;
