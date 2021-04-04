import { IUser } from "../../../services";
import { AppThunk } from "../../reducers";
import { RESET_USER, SET_USER } from "./types";

export const resetUser = (): AppThunk => async (dispatch) => {
  dispatch({ type: RESET_USER });
};

export const setUser = (user?: IUser): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: { user },
  });
};
