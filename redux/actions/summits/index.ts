import { ISummit, IPopularSummit, IUserSummit } from "../../../services";
import { AppThunk } from "../../reducers";
import {
  SET_FEATURED_SUMMITS,
  SET_POPULAR_SUMMITS,
  SET_USER_SUMMITS,
} from "./types";

export const setFeaturedSummits =
  (featuredSummits?: ISummit[]): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: SET_FEATURED_SUMMITS,
      payload: { featuredSummits },
    });
  };

export const setPopularSummits =
  (popularSummits?: IPopularSummit[]): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: SET_POPULAR_SUMMITS,
      payload: { popularSummits },
    });
  };

export const setUserSummits =
  (userSummits?: IUserSummit[]): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: SET_USER_SUMMITS,
      payload: { userSummits },
    });
  };
