import { IUser } from "../../../services";
import { AppThunk } from "../../reducers";
import { SET_USER } from "./types";

export const setUser = (user?: IUser): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: { ...user },
  });
};
