import { Feature } from "geojson";

export interface IFeaturedSummits {
  /** Uniquely identifies the summit */
  id: string;
  /** The summit's name */
  name: string;
}

export interface IPopularSummits {
  /** Number of check-ins previous 7 days */
  checkInsLastWeek: number;
  /** Number of check-ins previous 30 days */
  checkInsLastMonth: number;
  /** Number of check-ins previous year */
  checkInsLastYear: number;
  /** Number of check-ins all time*/
  checkInsAllTime: number;
  /** The summit's feature profile */
  feature: Feature;
}

class Summits {
  /** Fetch array of featured summit data */
  static async getFeaturedSummits(): Promise<IFeaturedSummits[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        { id: "0", name: "Conundrum Peak" },
        { id: "1", name: "El Diente Peak" },
        { id: "2", name: "Grays Peak" },
        { id: "3", name: "Kit Carson Peak" },
        { id: "4", name: "Maroon Peak" },
        { id: "5", name: "Mt. Belford" },
        { id: "6", name: "Mt. Mrah" },
      ]);
    } else {
      return Promise.reject(new Error("featured summits fail"));
    }
  }

  /** Fetch array of popular summit data */
  static async getPopularSummits(): Promise<IPopularSummits[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          checkInsLastWeek: 123,
          checkInsLastMonth: 234,
          checkInsLastYear: 345,
          checkInsAllTime: 456,
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
        },
        {
          checkInsLastWeek: 123,
          checkInsLastMonth: 234,
          checkInsLastYear: 345,
          checkInsAllTime: 456,
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-107.0664035, 39.1186541],
            },
            properties: {
              feet: 14107,
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
        },
        {
          checkInsLastWeek: 123,
          checkInsLastMonth: 234,
          checkInsLastYear: 345,
          checkInsAllTime: 456,
          feature: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-106.9870852, 39.076094],
            },
            properties: {
              feet: 14016,
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
        },
      ]);
    } else {
      return Promise.reject(new Error("popular summits fail"));
    }
  }
}

export default Summits;
