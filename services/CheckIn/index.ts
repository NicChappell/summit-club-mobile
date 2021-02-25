import { Feature } from "geojson";
import { IUser } from "../../common/interfaces";

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
  static async getRecentCheckIns(): Promise<ICheckIn[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: "0",
          user: {
            firstName: "Nic",
            lastName: "Chappell",
            email: "nwc@nicchappell.com",
            countryCode: "+1",
            phone: "4029685985",
            streetAddress1: "971 Homer Circle",
            streetAddress2: "",
            city: "Lafayette",
            state: "CO",
            postalCode: "80026ƒ",
          },
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-105.6162397, 40.2548614],
            },
            properties: {
              feet: 14262,
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
          date: new Date(),
        },
        {
          id: "1",
          user: {
            firstName: "Nic",
            lastName: "Chappell",
            email: "nwc@nicchappell.com",
            countryCode: "+1",
            phone: "4029685985",
            streetAddress1: "971 Homer Circle",
            streetAddress2: "",
            city: "Lafayette",
            state: "CO",
            postalCode: "80026ƒ",
          },
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-105.6162397, 40.2548614],
            },
            properties: {
              feet: 14262,
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
          date: new Date(),
        },
        {
          id: "2",
          user: {
            firstName: "Nic",
            lastName: "Chappell",
            email: "nwc@nicchappell.com",
            countryCode: "+1",
            phone: "4029685985",
            streetAddress1: "971 Homer Circle",
            streetAddress2: "",
            city: "Lafayette",
            state: "CO",
            postalCode: "80026ƒ",
          },
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-105.6162397, 40.2548614],
            },
            properties: {
              feet: 14262,
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
          date: new Date(),
        },
      ]);
    } else {
      return Promise.reject(new Error("recent check-ins fail"));
    }
  }
}

export default CheckIn;
