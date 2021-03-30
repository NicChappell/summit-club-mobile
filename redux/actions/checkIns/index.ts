import { ICheckIn } from "../../../services/CheckIn";
import { AppThunk } from "../../reducers";
import { RESET_CHECK_INS, SET_RECENT_CHECK_INS } from "./types";

export const resetCheckIns = (): AppThunk => async (dispatch) => {
  dispatch({ type: RESET_CHECK_INS });
};

export const setRecentCheckIns = (
  recentCheckIns?: ICheckIn[]
): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_RECENT_CHECK_INS,
    payload: { recentCheckIns },
  });
};
