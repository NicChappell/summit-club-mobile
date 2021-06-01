import { IFeatureRecord } from "./Feature";
import { MOCK_USER } from "../data/mocks";

/** The User's ID */
export type UserId = string;

export interface IUserAccount {
  /** The User's username */
  username: string;
  /** The User's password */
  password: string;
}

export interface IUserContact {
  /** The User's first name */
  firstName?: string;
  /** The User's last name */
  lastName?: string;
  /** The User's email address */
  email?: string;
  /** The User's phone's country code */
  countryCode?: string;
  /** The User's phone number */
  phone?: string;
  /** The User's street address */
  streetAddress1?: string;
  /** The User's street address */
  streetAddress2?: string;
  /** The User's city */
  city?: string;
  /** User state/province */
  province?: string;
  /** User postal code/zip code */
  postalCode?: string;
}

export interface IUserSummit extends IFeatureRecord {
  /** Indicates the existence of a check-in record */
  checkedIn: boolean;
  /** Indicates the existence of a check-off record */
  checkedOff: boolean;
}

export interface IUser {
  /** The User's ID */
  id: UserId;
  /** The User's Account information */
  account: IUserAccount;
  /** The User's Contact information */
  contact: IUserContact;
  /** The User's Summits */
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
