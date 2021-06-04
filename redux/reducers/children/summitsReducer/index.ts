import {
  SET_FEATURED_SUMMITS,
  SET_POPULAR_SUMMITS,
  SET_USER_SUMMITS,
} from "../../../actions/summits/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";

const summitsReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case SET_FEATURED_SUMMITS:
      return {
        ...state,
        featuredSummits: payload.featuredSummits,
      };
    case SET_POPULAR_SUMMITS:
      return {
        ...state,
        popularSummits: payload.popularSummits,
      };
    case SET_USER_SUMMITS:
      return {
        ...state,
        userSummits: payload.userSummits,
      };
    default:
      return state;
  }
};

export default summitsReducer;
