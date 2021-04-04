import { IUserAccount, IUserContact, IUserSummit } from "../../../services";

export type ProfileStackParamList = {
  Profile: undefined;
  Summits: { summits: IUserSummit[] };
  Contact: { contact: IUserContact };
  Account: { account: IUserAccount };
  Settings: undefined;
};
