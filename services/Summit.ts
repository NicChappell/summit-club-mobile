import { LatLng } from "react-native-maps";
import { SQLResultSet } from "expo-sqlite";
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  MultiPolygon,
  Point,
  Position,
} from "geojson";
import * as turf from "@turf/turf";
import { executeSql } from "./database";
import { MOCK_FEATURE } from "../data/mocks";

/**
 * Airport: Manmade facility maintained for the use of aircraft (airfield, airstrip, landing field, landing strip).
 * Arch: Natural arch-like opening in a rock mass (bridge, natural bridge, sea arch).
 * Area: Any one of several areally extensive natural features not included in other categories (badlands, barren, delta, fan, garden).
 * Arroyo: Watercourse or channel through which water may occasionally flow (coulee, draw, gully, wash).
 * Bar: Natural accumulation of sand, gravel, or alluvium forming an underwater or exposed embankment (ledge, reef, sandbar, shoal, spit).
 * Basin: Natural depression or relatively low area enclosed by higher land (amphitheater, cirque, pit, sink).
 * Bay: Indentation of a coastline or shoreline enclosing a part of a body of water; a body of water partly surrounded by land (arm, bight, cove, estuary, gulf, inlet, sound).
 * Beach: The sloping shore along a body of water that is washed by waves or tides and is usually covered by sand or gravel (coast, shore, strand).
 * Bench: Area of relatively level land on the flank of an elevation such as a hill, ridge, or mountain where the slope of the land rises on one side and descends on the opposite side (level).
 * Bend: Curve in the course of a stream and (or) the land within the curve; a curve in a linear body of water (bottom, loop, meander).
 * Bridge: Manmade structure carrying a trail, road, or other transportation system across a body of water or depression (causeway, overpass, trestle).
 * Building; A manmade structure with walls and a roof for protection of people and (or) materials, but not including church, hospital, or school.
 * Canal: Manmade waterway used by watercraft or for drainage, irrigation, mining, or water power (ditch, lateal).
 * Cape: Projection of land extending into a body of water (lea, neck, peninsula, point).
 * Cave: Natural underground passageway or chamber, or a hollowed out cavity in the side of a cliff (cavern, grotto).
 * Cemetery: A place or area for burying the dead (burial, burying ground, grave, memorial garden).
 * Census: A statistical area delineated locally specifically for the tabulation of Census Bureau data (census designated place, census county division, unorganized territory, various types of American Indian/Alaska Native statistical areas). Distinct from Civil and Populated Place.
 * Channel: Linear deep part of a body of water through which the main volume of water flows and is frequently used as aroute for watercraft (passage, reach, strait, thoroughfare, throughfare).
 * Church: Building used for religious worship (chapel, mosque, synagogue, tabernacle, temple).
 * Civil: A political division formed for administrative purposes (borough, county, incorporated place, municipio, parish, town, township). Distinct from Census and Populated Place.
 * Cliff: Very steep or vertical slope (bluff, crag, head, headland, nose, palisades, precipice, promontory, rim, rimrock).
 * Crater: Circular-shaped depression at the summit of a volcanic cone or one on the surface of the land caused by the impact of a meteorite; a manmade depression caused by an explosion (caldera, lua).
 * Crossing: A place where two or more routes of transportation form a junction or intersection (overpass, underpass).
 * Dam: Water barrier or embankment built across the course of a stream or into a body of water to control and (or) impound the flow of water (breakwater, dike, jetty).
 * Falls: Perpendicular or very steep fall of water in the course of a stream (cascade, cataract, waterfall).
 * Flat: Relative level area within a region of greater relief (clearing, glade, playa).
 * Forest: Bounded area of woods, forest, or grassland under the administration of a political agency (see "woods") (national forest, national grasslands, State forest).
 * Gap: Low point or opening between hills or mountains or in a ridge or mountain range (col, notch, pass, saddle, water gap, wind gap).
 * Glacier: Body or stream of ice moving outward and downslope from an area of accumulation; an area of relatively permanent snow or ice on the top or side of a mountain or mountainous area (icefield, ice patch, snow patch).
 * Gut: Relatively small coastal waterway connecting larger bodies of water or other waterways (creek, inlet, slough).
 * Harbor: Sheltered area of water where ships or other watercraft can anchor or dock (hono, port, roads, roadstead).
 * Hospital: Building where the sick or injured may receive medical or surgical attention (infirmary).
 * Island: Area of dry or relatively dry land surrounded by water or low wetland (archipelago, atoll, cay, hammock, hummock, isla, isle, key, moku, rock).
 * Isthmus: Narrow section of land in a body of water connecting two larger land areas.
 * Lake: Natural body of inland water (backwater, lac, lagoon, laguna, pond, pool, resaca, waterhole).
 * Lava: Formations resulting from the consolidation of molten rock on the surface of the Earth (kepula, lava flow).
 * Levee: Natural or manmade embankment flanking a stream (bank, berm).
 * Locale: Place at which there is or was human activity; it does not include populated places, mines, and dams (battlefield, crossroad, camp, farm, ghost town, landing, railroad siding, ranch, ruins, site, station, windmill).
 * Military; Place or facility used for various aspects of or relating to military activity.
 * Mine: Place or area from which commercial minerals are or were removed from the Earth; not including oilfield (pit, quarry, shaft).
 * Oilfield: Area where petroleum is or was removed from the Earth.
 * Park: Place or area set aside for recreation or preservation of a cultural or natural resource and under some form of government administration; not including National or State forests or Reserves (national historical landmark, national park, State park, wilderness area).
 * Pillar: Vertical, standing, often spire-shaped, natural rock formation (chimney, monument, pinnacle, pohaku, rock tower).
 * Plain: A region of general uniform slope, comparatively level and of considerable extent (grassland, highland, kula, plateau, upland).
 * Populated Place: Place or area with clustered or scattered buildings and a permanent human population (city, settlement, town, village). A populated place is usually not incorporated and by definition has no legal boundaries. However, a populated place may have a corresponding "civil" record, the legal boundaries of which may or may not coincide with the perceived populated place. Distinct from Census and Civil classes.
 * Post Office: An official facility of the U.S. Postal Service used for processing and distributing mail and other postal material.
 * Range: Chain of hills or mountains; a somewhat linear, complex mountainous or hilly area (cordillera, sierra).
 * Rapids: Fast-flowing section of a stream, often shallow and with exposed rock or boulders (riffle, ripple).
 * Reserve: A tract of land set aside for a specific use (does not include forests, civil divisions, parks).
 * Reservoir: Artificially impounded body of water (lake, tank).
 * Ridge: Elevation with a narrow, elongated crest which can be part of a hill or mountain (crest, cuesta, escarpment, hogback, lae, rim, spur).
 * School: Building or group of buildings used as an institution for study, teaching, and learning (academy, college, high school, university).
 * Sea; Large body of salt water (gulf, ocean).
 * Slope: A gently inclined part of the Earth's surface (grade, pitch).
 * Spring: Place where underground water flows naturally to the surface of the Earth (seep).
 * Stream; Linear body of water flowing on the Earth's surface (anabranch, awawa, bayou, branch, brook, creek, distributary, fork, kill, pup, rio, river, run, slough).
 * Summit: Prominent elevation rising above the surrounding level of the Earth's surface; does not include pillars, ridges, or ranges (ahu, berg, bald, butte, cerro, colina, cone, cumbre, dome, head, hill, horn, knob, knoll, mauna, mesa, mesita, mound, mount, mountain, peak, puu, rock, sugarloaf, table, volcano).
 * Swamp: Poorly drained wetland, fresh or saltwater, wooded or grassy, possibly covered with open water (bog, cienega, marais, marsh, pocosin).
 * Tower: A manmade structure, higher than its diameter, generally used for observation, storage, or electronic transmission.
 * Trail: Route for passage from one point to another; does not include roads or highways (jeep trail, path, ski trail).
 * Tunnel: Linear underground passageway open at both ends.
 * Unknown: This class is assigned to legacy data only. It will not be assigned to new or edited records.
 * Valley: Linear depression in the Earth's surface that generally slopes from one end to the other (barranca, canyon, chasm, cove, draw, glen, gorge, gulch, gulf, hollow, ravine).
 * Well: Manmade shaft or hole in the Earth's surface used to obtain fluid or gaseous materials.
 * Woods: Small area covered with a dense growth of trees; does not include an area of trees under the administration of a political agency (see "forest").
 */
export type FeatureClassification =
  | "Airport"
  | "Arch"
  | "Area"
  | "Arroyo"
  | "Bar"
  | "Basin"
  | "Bay"
  | "Beach"
  | "Bench"
  | "Bend"
  | "Bridge"
  | "Building"
  | "Canal"
  | "Cape"
  | "Cave"
  | "Cemetery"
  | "Census"
  | "Channel"
  | "Church"
  | "Civil"
  | "Cliff"
  | "Crater"
  | "Crossing"
  | "Dam"
  | "Falls"
  | "Flat"
  | "Forest"
  | "Gap"
  | "Glacier"
  | "Gut"
  | "Harbor"
  | "Hospital"
  | "Island"
  | "Isthmus"
  | "Lake"
  | "Lava"
  | "Levee"
  | "Locale"
  | "Military"
  | "Mine"
  | "Oilfield"
  | "Park"
  | "Pillar"
  | "Plain"
  | "Populated Place"
  | "Post Office"
  | "Range"
  | "Rapids"
  | "Reserve"
  | "Reservoir"
  | "Ridge"
  | "School"
  | "Sea"
  | "Slope"
  | "Spring"
  | "Stream"
  | "Summit"
  | "Swamp"
  | "Tower"
  | "Trail"
  | "Tunnel"
  | "Unknown"
  | "Valley"
  | "Well"
  | "Woods";

export type SummitType =
  | "featuredSummit"
  | "filteredSummit"
  | "nearbySummit"
  | "popularSummit";

export interface IBounds {
  /** Northeast map boundary coordinate */
  northEast: LatLng;
  /** Southwest map boundary coordinate */
  southWest: LatLng;
}

export interface ISummit {
  /** Uniquely identifies the Summit record */
  id: number;
  /** Type of Summit */
  type: SummitType;
  /** The Feature profile */
  feature: Feature<Geometry, GeoJsonProperties>;
}

export interface IQueryParams {
  /** Map boundary coordinates */
  bounds: IBounds;
  /** Filter expression */
  filters: string;
  /** Order of the results */
  orderBy: "ASC" | "DESC";
  /** Number of rows to return */
  limit: number;
  /** Number of rows to ignore */
  offset: number;
}

export interface IQueryResult {
  /** Feature class definition */
  class: FeatureClassification;
  /** Name of a continent */
  continent: "North America";
  /** Name of a country */
  country: "United States";
  /** The name for a county or county equivalent  */
  county: string;
  /** Elevation in feet above (-below) sea level of the feature at the primary coordinates */
  feet: number;
  /** Uniquely identifies the feature */
  id: number;
  /** The official latitude coordinate of the feature location */
  latitude: number;
  /** The official longitude coordinate of the feature location */
  longitude: number;
  /** Elevation in meters above (-below) sea level of the feature at the primary coordinates */
  meters: number;
  /** Permanent, official feature name */
  name: string;
  /** The unique two letter alphabetic code for a US State */
  state: string;
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

export const defaultBounds: IBounds = {
  northEast: {
    latitude: 41.003906, // northeast latitude coordinate
    longitude: -102.042974, // northeast longitude coordinate
  },
  southWest: {
    latitude: 36.994786, // southwest latitude coordinate
    longitude: -109.058934, // southwest longitude coordinate
  },
};

export const processResultSet = (resultSet: SQLResultSet) => {
  // destructure ResultSet
  const { _array }: any = resultSet.rows;

  // convert ResultSet array into GeoJSON Features
  const features = _array.map((result: IQueryResult) => {
    // create a GeoJSON Geometry from result coordinates
    const geometry: Geometry = {
      type: "Point",
      coordinates: [result.longitude, result.latitude],
    };

    // create a GeoJSON properties object from result properties
    const properties: GeoJsonProperties = { ...result };

    // create a GeoJSON Feature
    const feature: Feature = turf.feature(geometry, properties);

    return feature;
  });

  // create a GeoJSON FeatureCollection from GeoJSON Features
  const featureCollection: FeatureCollection<Point> = turf.featureCollection(
    features
  );

  return featureCollection;
};

class Summit {
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

  /** Fetch array of filtered summits */
  // TODO: SOME WAY OF MAKING THESE THINGS OPTIONAL / USE DEFAULTS IF VALUES NOT PROVIDED
  static async query(
    params: IQueryParams = {
      bounds: defaultBounds,
      filters: "",
      orderBy: "DESC",
      limit: 64,
      offset: 0,
    }
  ): Promise<ISummit[]> {
    // destructure params
    const { bounds, filters, orderBy, limit, offset } = params;

    // destructure boundaries
    const northEast = bounds.northEast;
    const southWest = bounds.southWest;

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
    const featureCollection = processResultSet(resultSet);

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
