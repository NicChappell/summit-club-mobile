import { MOCK_USER } from "../../data/mocks";
import {
  UserId,
  IUser,
  IUserAccount,
  IUserContact,
  IUserSettings,
} from "./types";

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

export { UserId, IUser, IUserAccount, IUserContact, IUserSettings };
