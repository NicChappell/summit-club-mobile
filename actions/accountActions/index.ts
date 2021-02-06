import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppThunk } from "../../reducers";
import { COMPLETE_TOUR, RESET_TOUR, SKIP_TOUR } from "./types";

export const checkTour = (): AppThunk => async (dispatch) => {
  // retrieve tour status from async storage
  const tourStatus = await AsyncStorage.getItem("tourStatus");

  if (tourStatus) {
    // update state to render home screen
    dispatch({ type: SKIP_TOUR, payload: { tourStatus: "complete" } });
  }
};

export const completeTour = (): AppThunk => async (dispatch) => {
  // update tour status in async storage
  await AsyncStorage.setItem("tourStatus", "complete");

  // update state to render home screen
  dispatch({ type: COMPLETE_TOUR, payload: { tourStatus: "complete" } });
};

export const resetTour = (): AppThunk => async (dispatch) => {
  // remove tour status from async storage
  await AsyncStorage.removeItem("tourStatus");

  // update state to render tour screen
  dispatch({ type: RESET_TOUR, payload: { tourStatus: undefined } });
};
