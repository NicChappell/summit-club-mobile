import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { MOCK_FEATURE } from "../../data/mocks";

export type SummitType = "featuredSummit" | "filteredSummit" | "popularSummit";

export interface ISummit {
  /** Uniquely identifies the Summit */
  id: number;
  /** Type of Summit */
  type: SummitType;
  /** The Feature profile */
  feature: Feature<Geometry, GeoJsonProperties>;
}

export interface IPopularSummit extends ISummit {
  /** Number of check-ins previous 7 days */
  checkInsLastWeek: number;
  /** Number of check-ins previous 30 days */
  checkInsLastMonth: number;
  /** Number of check-ins previous year */
  checkInsLastYear: number;
  /** Number of check-ins all time*/
  checkInsAllTime: number;
}

class Summit {
  /** Fetch array of featured summit data */
  static getFeaturedSummits(): Promise<ISummit[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: 0,
          type: "featuredSummit",
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
        },
        {
          id: 1,
          type: "featuredSummit",
          feature: MOCK_FEATURE,
        },
        {
          id: 2,
          type: "featuredSummit",
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
        },
        {
          id: 3,
          type: "featuredSummit",
          feature: MOCK_FEATURE,
        },
        {
          id: 4,
          type: "featuredSummit",
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
        },
        {
          id: 5,
          type: "featuredSummit",
          feature: MOCK_FEATURE,
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }

  /** Fetch array of popular summit data */
  static getPopularSummits(): Promise<IPopularSummit[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: 1,
          type: "popularSummit",
          checkInsLastWeek: 111,
          checkInsLastMonth: 111,
          checkInsLastYear: 111,
          checkInsAllTime: 111,
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
        },
        {
          id: 2,
          type: "popularSummit",
          checkInsLastWeek: 222,
          checkInsLastMonth: 222,
          checkInsLastYear: 222,
          checkInsAllTime: 222,
          feature: {
            ...MOCK_FEATURE,
            properties: {
              ...MOCK_FEATURE.properties,
              name: "asdf",
            },
          },
        },
        {
          id: 3,
          type: "popularSummit",
          checkInsLastWeek: 222,
          checkInsLastMonth: 222,
          checkInsLastYear: 222,
          checkInsAllTime: 222,
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
        },
        {
          id: 4,
          type: "popularSummit",
          checkInsLastWeek: 222,
          checkInsLastMonth: 222,
          checkInsLastYear: 222,
          checkInsAllTime: 222,
          feature: {
            ...MOCK_FEATURE,
            properties: {
              ...MOCK_FEATURE.properties,
              name: "qwer",
            },
          },
        },
        {
          id: 5,
          type: "popularSummit",
          checkInsLastWeek: 333,
          checkInsLastMonth: 333,
          checkInsLastYear: 333,
          checkInsAllTime: 333,
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
        },
        {
          id: 6,
          type: "popularSummit",
          checkInsLastWeek: 222,
          checkInsLastMonth: 222,
          checkInsLastYear: 222,
          checkInsAllTime: 222,
          feature: {
            ...MOCK_FEATURE,
            properties: {
              ...MOCK_FEATURE.properties,
              name: "zxcv",
            },
          },
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }

  /** Query local Features database */
  static query(): Promise<ISummit[]> {
    // TODO: SQLITE DATABASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: 0,
          type: "filteredSummit",
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
        },
        {
          id: 1,
          type: "filteredSummit",
          feature: MOCK_FEATURE,
        },
        {
          id: 2,
          type: "filteredSummit",
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
        },
        {
          id: 3,
          type: "filteredSummit",
          feature: MOCK_FEATURE,
        },
        {
          id: 4,
          type: "filteredSummit",
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
        },
        {
          id: 5,
          type: "filteredSummit",
          feature: MOCK_FEATURE,
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default Summit;
