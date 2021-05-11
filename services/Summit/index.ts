import * as SQLite from "expo-sqlite";
import { executeSql } from "../database";
import { MOCK_FEATURE } from "../../data/mocks";
import { defaultBounds, defaultQueryParams } from "./constants";
import { processFeatureCollection } from "./helpers";
import {
  FeatureClassification,
  SummitType,
  IBounds,
  IQueryParams,
  IQueryResult,
  IPopularSummit,
  ISummit,
} from "./types";

class Summit {
  /** Find summit by name */
  static findByName(name: string): Promise<SQLite.SQLResultSet> {
    // TODO: FIREBASE QUERY

    // database query
    const sqlStatement = `SELECT * FROM feature WHERE name="${name}"`;

    return executeSql(sqlStatement);
  }

  /** Fetch array of featured summits */
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

  /** Fetch array of popular summits */
  static getNearbySummits(): Promise<ISummit[]> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve([
        {
          id: 0,
          type: "nearbySummit",
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
          type: "nearbySummit",
          feature: MOCK_FEATURE,
        },
        {
          id: 2,
          type: "nearbySummit",
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
          type: "nearbySummit",
          feature: MOCK_FEATURE,
        },
        {
          id: 4,
          type: "nearbySummit",
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
          type: "nearbySummit",
          feature: MOCK_FEATURE,
        },
      ]);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }

  /** Fetch array of popular summits */
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

  /** Fetch array of summit names */
  static getSummitNames(): Promise<SQLite.SQLResultSet> {
    // TODO: FIREBASE QUERY

    // database query
    const sqlStatement = "SELECT name FROM feature";

    return executeSql(sqlStatement);
  }

  /** Fetch array of filtered summits */
  static async query(params: IQueryParams): Promise<ISummit[]> {
    // merge default query params
    const queryParams = {
      ...defaultQueryParams,
      params,
    };

    // destructure params
    const { bounds, filters, orderBy, limit, offset } = queryParams;

    // destructure boundaries
    const northEast = bounds?.northEast;
    const southWest = bounds?.southWest;

    // destructure northeast coordinates
    const neLat = northEast?.latitude;
    const neLng = northEast?.longitude;

    // destructure southwest coordinates
    const swLat = southWest?.latitude;
    const swLng = southWest?.longitude;

    // construct sql statement
    const sqlStatement = `
      SELECT *
      FROM feature
      WHERE (
        latitude < ${neLat}
        AND longitude < ${neLng}
        AND latitude > ${swLat}
        AND longitude > ${swLng}
      ) ${filters}
      ORDER BY meters ${orderBy}
      LIMIT ${limit}
      OFFSET ${offset};
    `;

    // execute sql statement
    const resultSet = await executeSql!(sqlStatement);

    // convert resultSet into FeatureCollection
    const featureCollection = processFeatureCollection(resultSet);

    // create collection of Summits from FeatureCollection
    const summits: ISummit[] = featureCollection.features.map((feature) => ({
      id: feature.properties?.id,
      type: "filteredSummit",
      feature,
    }));

    return summits;
  }
}

export default Summit;

export {
  FeatureClassification,
  SummitType,
  IBounds,
  IPopularSummit,
  IQueryParams,
  IQueryResult,
  ISummit,
  defaultBounds,
};
