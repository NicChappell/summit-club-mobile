import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
} from "../../../actions/authActions/types";
import { IAction } from "../../../common/interfaces";
import { initState } from "./constants";

const authReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        idToken: payload.idToken,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        idToken: payload.idToken,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        idToken: payload.idToken,
      };
    default:
      return state;
  }
};

export default authReducer;
