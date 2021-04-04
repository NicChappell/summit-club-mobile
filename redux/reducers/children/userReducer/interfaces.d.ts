import { IUserAccount, IUserContact, IUserSummit } from "../../../../services";

export interface IUserState {
  /** The user's Account information */
  account?: IUserAccount;
  /** The user's Contact information */
  contact?: IUserContact;
  /** The user's Summits */
  summits?: IUserSummit[];
}
