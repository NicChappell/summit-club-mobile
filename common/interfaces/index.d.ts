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

export interface IUserAccount {
  /** user's username */
  username: string;
  /** user's password */
  password: string;
}

export interface IUserContact {
  /** user's first name */
  firstName?: string;
  /** user's last name */
  lastName?: string;
  /** user's email address */
  email?: string;
  /** user's phone's country code */
  countryCode?: string;
  /** user's phone number */
  phone?: string;
  /** user's street address */
  streetAddress1?: string;
  /** user's street address */
  streetAddress2?: string;
  /** user's city */
  city?: string;
  /** user's state/province */
  province?: string;
  /** user's postal code/zip code */
  postalCode?: string;
}

export interface IUserSummit {
  /** the summit's feature profile */
  feature: Feature;
  /** array of check-in timestamps */
  checkIns: string[];
}

export interface IUser {
  /** user's account information */
  account: IUserAccount;
  /** user's contact information */
  contact: IUserContact;
  /** user's summits */
  summits: IUserSummit[];
}
