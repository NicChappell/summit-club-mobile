import { Feature } from "geojson";
import { MOCK_USER } from "../../data/mocks";

export interface IUserAccount {
  /** The user's username */
  username: string;
  /** The user's password */
  password: string;
}

export interface IUserContact {
  /** The user's first name */
  firstName?: string;
  /** The user's last name */
  lastName?: string;
  /** The user's email address */
  email?: string;
  /** The user's phone's country code */
  countryCode?: string;
  /** The user's phone number */
  phone?: string;
  /** The user's street address */
  streetAddress1?: string;
  /** The user's street address */
  streetAddress2?: string;
  /** The user's city */
  city?: string;
  /** User state/province */
  province?: string;
  /** User postal code/zip code */
  postalCode?: string;
}

export interface IUserSummit {
  /** Uniquely identifies the user's Summit record */
  id: number;
  /** Summit profile */
  feature: Feature;
  /** Array of Check-in timestamps */
  checkIns?: Date[] | null;
  /** Timestamp of check-off */
  checkOff?: Date | null;
}

export interface IUser {
  /** The user's Account information */
  account: IUserAccount;
  /** The user's Contact information */
  contact: IUserContact;
  /** The user's Summits */
  summits: IUserSummit[];
}

class User {
  /** Fetch User profile */
  static get(uid: string): Promise<IUser> {
    // TODO: FIREBASE QUERY

    if (true) {
      return Promise.resolve(MOCK_USER);
    } else {
      return Promise.reject(new Error("unable to process request"));
    }
  }
}

export default User;
