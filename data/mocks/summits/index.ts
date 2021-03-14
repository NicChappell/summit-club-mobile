import { IUserSummit } from "../../../services/User";
import { MOCK_FEATURE } from "../features";

export const MOCK_SUMMIT: IUserSummit = {
  feature: MOCK_FEATURE,
  checkIns: [`${new Date().toString()}`],
};
