import * as SQLite from "expo-sqlite";
import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { MOCK_USER } from "../../data/mocks";
import { executeSql } from "../database";
import { IUser } from "../User";

export type CheckInType = "recentCheckIn" | "userCheckIn";

export interface ICheckIn {
  /** Uniquely identifies the Check-in record */
  id: string;
  /** Type of Check-in */
  type: CheckInType;
  /** The User profile */
  user: IUser;
  /** The Feature profile */
  feature: Feature<Geometry, GeoJsonProperties>;
  /** Timestamp of Check-in */
  timestamp: Date;
}

class CheckIn {
  /** Fetch array of User's check-in data */
  static getRecentCheckIns(): Promise<ICheckIn[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: "0",
          type: "recentCheckIn",
          user: MOCK_USER,
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-105.6162397, 40.2548614],
            },
            properties: {
              feet: 14262,
              id: 1,
              meters: 4347,
              latitude: 40.2548614,
              longitude: -105.6162397,
              name: "Longs Peak",
              class: "Summit",
              county: "Boulder",
              state: "CO",
              country: "United States",
              continent: "North America",
            },
          },
          timestamp: new Date(),
        },
        {
          id: "1",
          type: "recentCheckIn",
          user: MOCK_USER,
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-107.0664035, 39.1186541],
            },
            properties: {
              feet: 14107,
              id: 2,
              meters: 4300,
              latitude: 39.1186541,
              longitude: -107.0664035,
              name: "Snowmass Mountain",
              class: "Summit",
              county: "Gunnison",
              state: "CO",
              country: "United States",
              continent: "North America",
            },
          },
          timestamp: new Date(),
        },
        {
          id: "2",
          type: "recentCheckIn",
          user: MOCK_USER,
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-106.9870852, 39.076094],
            },
            properties: {
              feet: 14016,
              id: 3,
              meters: 4272,
              latitude: 39.076094,
              longitude: -106.9870852,
              name: "North Maroon Peak",
              class: "Summit",
              county: "Pitkin",
              state: "CO",
              country: "United States",
              continent: "North America",
            },
          },
          timestamp: new Date(),
        },
        {
          id: "3",
          type: "recentCheckIn",
          user: MOCK_USER,
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-105.6162397, 40.2548614],
            },
            properties: {
              feet: 14262,
              id: 1,
              meters: 4347,
              latitude: 40.2548614,
              longitude: -105.6162397,
              name: "Longs Peak",
              class: "Summit",
              county: "Boulder",
              state: "CO",
              country: "United States",
              continent: "North America",
            },
          },
          timestamp: new Date(),
        },
        {
          id: "4",
          type: "recentCheckIn",
          user: MOCK_USER,
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-107.0664035, 39.1186541],
            },
            properties: {
              feet: 14107,
              id: 2,
              meters: 4300,
              latitude: 39.1186541,
              longitude: -107.0664035,
              name: "Snowmass Mountain",
              class: "Summit",
              county: "Gunnison",
              state: "CO",
              country: "United States",
              continent: "North America",
            },
          },
          timestamp: new Date(),
        },
        {
          id: "5",
          type: "recentCheckIn",
          user: MOCK_USER,
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-106.9870852, 39.076094],
            },
            properties: {
              feet: 14016,
              id: 3,
              meters: 4272,
              latitude: 39.076094,
              longitude: -106.9870852,
              name: "North Maroon Peak",
              class: "Summit",
              county: "Pitkin",
              state: "CO",
              country: "United States",
              continent: "North America",
            },
          },
          timestamp: new Date(),
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }

  static createCheckInTable = (): Promise<SQLite.SQLResultSet> => {
    return new Promise((resolve, reject) => {
      const sqlStatement = `
            CREATE TABLE IF NOT EXISTS check_in (
                id TEXT,
                userId TEXT,
                featureId TEXT,
                timestamp TEXT,
            );
          `;

      executeSql(sqlStatement)
        .then((resultSet) => {
          resolve(resultSet);
        })
        .catch((error) => {
          reject(error);
        });
    });

    // stop loading animation
    // TODO: STOP LOADING ANIMATION
  };
}

export default CheckIn;
