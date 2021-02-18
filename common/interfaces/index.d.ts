export interface IAction {
  /** action type */
  type: string;
  /** action payload */
  payload: any;
}

export interface IAuthCredentials {
  /** user provided email */
  email: string;
  /** user provided password */
  password: string;
}

export interface IError {
  /** error code */
  code?: number | string;
  /** error message */
  message?: string;
}

// "small"	< 600m
// "medium"	< 4200m
// "large"	> 4200m
export type MarkerSize = "small" | "medium" | "large";
export type MarkerSymbol = "triangle";

export interface ISQLResult {
  /** continent where feature is located */
  continent: string;
  /** list of countries where feature is located */
  countries: string;
  /** elevation of feature measured in feet */
  feet: number;
  /** latitude of the feature */
  latitude: number;
  /** longitude of the feature */
  longitude: number;
  /** size of feature marker */
  marker_size: MarkerSize;
  /** type of feature marker */
  marker_symbol: MarkerSymbol;
  /** elevation of feature measured in meters */
  meters: number;
  /** name of the feature */
  name: string;
  /** list of regions where feature is located */
  regions: string;
  /** list of states where feature is located */
  states: string;
}

export interface IUser {
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
  /** user's state */
  state?: string;
  /** user's postal code */
  postalCode?: string;
}
