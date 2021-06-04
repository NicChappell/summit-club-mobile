import { IUserAccount, IUserContact, IUserSettings } from "../../../services";

export type ProfileStackParamList = {
  Profile: undefined;
  Summits: undefined;
  Contact: { contact: IUserContact };
  Account: { account: IUserAccount };
  Settings: { settings: IUserSettings };
};
