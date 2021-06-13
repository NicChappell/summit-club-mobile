import { IError } from "../../../common/types";
import { AppThunk } from "../../reducers";
import { initState } from "../../reducers/children/errorReducer/constants";
import { CLEAR_ERROR, SET_ERROR } from "./types";

export const clearError = (): AppThunk => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
    payload: { ...initState },
  });
};

export const setError =
  (error: IError): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: SET_ERROR,
      payload: { message: error.message },
    });
  };
