import firebase from "firebase/app";

export interface IUserAccount {
  /** The User's username */
  username: string;
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
  /** The User's state/province */
  province?: string;
  /** The User's postal code/zip code */
  postalCode?: string;
}

export interface IUserDocument {
  /** The User's ID */
  id: UserId;
  /** The User's account information */
  account: IUserAccount;
  /** The User's contact information */
  contact: IUserContact;
  /** The User's settings */
  settings: IUserSettings;
  /** Timestamp when the document was created measured in milliseconds */
  createdAt: firebase.firestore.Timestamp;
}

export interface IUserSettings {
  /** The User's permissions */
  permissions: {
    /** Indicates status of location permission */
    location?: boolean;
  };
  /** The User's preferences */
  preferences: {
    /** Indicates check-in sharing preference */
    shareUsers: boolean;
  };
}

export type UserId = string;
