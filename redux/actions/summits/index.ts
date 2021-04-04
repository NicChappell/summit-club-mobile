import { ISummit, IPopularSummit } from "../../../services";
import { AppThunk } from "../../reducers";
import {
  RESET_SUMMITS,
  SET_FEATURED_SUMMITS,
  SET_POPULAR_SUMMITS,
} from "./types";

export const resetSummits = (): AppThunk => async (dispatch) => {
  dispatch({ type: RESET_SUMMITS });
};

export const setFeaturedSummits = (
  featuredSummits?: ISummit[]
): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_FEATURED_SUMMITS,
    payload: { featuredSummits },
  });
};

export const setPopularSummits = (
  popularSummits?: IPopularSummit[]
): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_POPULAR_SUMMITS,
    payload: { popularSummits },
  });
};
