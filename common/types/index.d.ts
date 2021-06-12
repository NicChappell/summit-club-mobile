import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { LatLng } from "react-native-maps";

export type ElevationTier =
  | "above14"
  | "between13and14"
  | "between12and13"
  | "between11and12"
  | "between10and11"
  | "below10";

export type Feature = Feature<Geometry, GeoJsonProperties>;

export interface IAction<P = { [name: string]: any }> {
  /** Action type */
  type: string;
  /** Action payload */
  payload: P;
}

// TODO: THIS CAN PROBABLY DE DELETED IN FAVOR OF INTERFACE IN AUTH SERVICE
export interface IAuthCredentials {
  /** User provided email */
  email: string;
  /** User provided password */
  password: string;
}

// TODO: THIS CAN PROBABLY DE DELETED IN FAVOR OF DUPLICATE INTERFACE IN ERROR SERVICE
export interface IError {
  /** Error code */
  code?: number | string;
  /** Error message */
  message?: string;
}

// TODO: THIS CAN PROBABLY BE DELETED IN FAVOR OF DUPLICATE INTERFACE IN SUMMITS SERVICE
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
