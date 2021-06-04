import {
  UserId,
  IUserAccount,
  IUserContact,
  IUserSettings,
} from "../../../../services";

export interface IUserState {
  /** The User's account information */
  account?: IUserAccount;
  /** The User's contact information */
  contact?: IUserContact;
  /** The User's ID */
  id?: UserId;
  /** The User's settings */
  settings?: IUserSettings;
}
