import {
  COMPLETE_TOUR,
  RESET_TOUR,
  SKIP_TOUR,
} from "../../../actions/account/types";
import { IAction } from "../../../../common/interfaces";
import { initState } from "./constants";

const authReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case COMPLETE_TOUR:
      return {
        ...state,
        tourStatus: payload.tourStatus,
      };
    case RESET_TOUR:
      return {
        ...state,
        tourStatus: payload.tourStatus,
      };
    case SKIP_TOUR:
      return {
        ...state,
        tourStatus: payload.tourStatus,
      };
    default:
      return state;
  }
};

export default authReducer;
