import { Feature, Geometry, GeoJsonProperties } from "geojson";
import { IFeatureFilters } from "../../../common/types";
import { AppThunk } from "../../reducers";
import {
  RESET_FEATURE,
  SET_FEATURE,
  SET_FEATURE_FILTERS,
  SET_FEATURES,
} from "./types";

export const resetFeatures = (): AppThunk => async (dispatch) => {
  dispatch({ type: RESET_FEATURE });
};

export const setFeature = (
  feature?: Feature<Geometry, GeoJsonProperties>
): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_FEATURE,
    payload: { feature },
  });
};

export const setFeatureFilters = (filters: IFeatureFilters): AppThunk => async (
  dispatch
) => {
  dispatch({
    type: SET_FEATURE_FILTERS,
    payload: { filters },
  });
};

export const setFeatures = (
  features?: Feature<Geometry, GeoJsonProperties>[]
): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_FEATURES,
    payload: { features },
  });
};
