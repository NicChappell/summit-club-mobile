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

export interface ISQLResult {
  /** classification of the feature */
  class: string;
  /** continent where feature is located */
  continent: string;
  /** country where feature is located */
  country: string;
  /** county where feature is located */
  county: string;
  /** elevation of feature measured in feet */
  feet: number;
  /** latitude of the feature */
  latitude: number;
  /** longitude of the feature */
  longitude: number;
  /** elevation of feature measured in meters */
  meters: number;
  /** name of the feature */
  name: string;
  /** state where feature is located */
  state: string;
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
