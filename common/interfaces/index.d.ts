import { Feature } from "geojson";
import { LatLng } from "react-native-maps";
import { Classification } from "../types";

export interface IAction {
  /** Action type */
  type: string;
  /** Action payload */
  payload: any;
}

export interface IAuthCredentials {
  /** User provided email */
  email: string;
  /** User provided password */
  password: string;
}

export interface IError {
  /** Error code */
  code?: number | string;
  /** Error message */
  message?: string;
}

export interface IMapBoundaries {
  /** Northeast map boundary coordinate */
  northEast: LatLng;
  /** Southwest map boundary coordinate */
  southWest: LatLng;
}

export interface IFeatureFilters {
  /** Maximum summit elevation to return */
  maxElevation?: number;
  /** Include summits with elvations above 14,000' */
  above14?: boolean;
  /** Include summits with elvations between 13,000' and 14,000' */
  between13and14?: boolean;
  /** Include summits with elvations between 12,000' and 13,000' */
  between12and13?: boolean;
  /** Include summits with elvations between 11,000' and 12,000' */
  between11and12?: boolean;
  /** Include summits with elvations between 10,000' and 11,000' */
  between10and11?: boolean;
  /** Include summits with elvations below 10,000' */
  below10?: boolean;
  /** Render counties overlay */
  countiesOverlay?: boolean;
}

export interface ISQLResult {
  /** Feature class definition */
  class: Classification;
  /** Name of a continent */
  continent: "North America";
  /** Name of a country */
  country: "United States";
  /** The name for a county or county equivalent  */
  county: string;
  /** Elevation in feet above (-below) sea level of the feature at the primary coordinates */
  feet: number;
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
