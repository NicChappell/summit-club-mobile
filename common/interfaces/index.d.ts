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
