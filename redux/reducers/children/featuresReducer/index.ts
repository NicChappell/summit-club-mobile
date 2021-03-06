import {
  RESET_FEATURE,
  SET_FEATURE,
  SET_FEATURE_FILTERS,
  SET_FEATURES,
} from "../../../actions/features/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";

const featuresReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case RESET_FEATURE:
      return { ...initState };
    case SET_FEATURE:
      return {
        ...state,
        feature: payload.feature,
      };
    case SET_FEATURE_FILTERS:
      return {
        ...state,
        featureFilters: payload.featureFilters,
      };
    case SET_FEATURES:
      return {
        ...state,
        features: payload.features,
      };
    default:
      return state;
  }
};

export default featuresReducer;
