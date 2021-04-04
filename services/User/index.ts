import { Feature } from "geojson";
import { MOCK_USER } from "../../data/mocks";

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
  /** The summit's feature profile */
  feature: Feature;
  /** Array of Check-in timestamps */
  checkIns?: Date[] | null;
  /** Timestamp of check-off */
  checkOff?: Date | null;
}

export interface IUser {
  /** user's account information */
  account: IUserAccount;
  /** user's contact information */
  contact: IUserContact;
  /** user's summits */
  summits: IUserSummit[];
}

class User {
  /** Fetch array of recent check-in data */
  static get(): Promise<IUser> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve(MOCK_USER);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default User;
