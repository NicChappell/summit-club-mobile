import { IUserSummit } from "../../../services";
import { MOCK_FEATURE } from "../features";

export const MOCK_SUMMIT: IUserSummit = {
  id: 1,
  feature: MOCK_FEATURE,
  checkIns: [new Date()],
  checkOff: undefined,
};
