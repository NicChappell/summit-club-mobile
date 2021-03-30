import {
  RESET_CHECK_INS,
  SET_RECENT_CHECK_INS,
} from "../../../actions/checkIns/types";
import { IAction } from "../../../../common/interfaces";
import { initState } from "./constants";

const checkInsReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case RESET_CHECK_INS:
      return { ...initState };
    case SET_RECENT_CHECK_INS:
      return {
        ...state,
        feature: payload.recentCheckIns,
      };
    default:
      return state;
  }
};

export default checkInsReducer;
