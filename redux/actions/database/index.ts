import * as SQLite from "expo-sqlite";
import { AppThunk } from "../../reducers";
import { SET_DATABASE } from "./types";

export const setDatabase = (
  database?: SQLite.WebSQLDatabase
): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_DATABASE,
    payload: { database },
  });
};
