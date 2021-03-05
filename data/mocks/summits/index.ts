import { IUserSummit } from "../../../common/interfaces";
import { MOCK_FEATURE } from "../features";

export const MOCK_SUMMIT: IUserSummit = {
  feature: MOCK_FEATURE,
  checkIns: [`${new Date().toString()}`],
};
