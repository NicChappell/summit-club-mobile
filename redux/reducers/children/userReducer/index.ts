import {
  RESET_SUMMITS,
  SET_FEATURED_SUMMITS,
  SET_POPULAR_SUMMITS,
} from "../../../actions/summits/types";
import { IAction } from "../../../../common/interfaces";
import { initState } from "./constants";

const summitsReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case RESET_SUMMITS:
      return { ...initState };
    case SET_FEATURED_SUMMITS:
      return {
        ...state,
        feature: payload.featuredSummits,
      };
    case SET_POPULAR_SUMMITS:
      return {
        ...state,
        features: payload.popularSummits,
      };
    default:
      return state;
  }
};

export default summitsReducer;
