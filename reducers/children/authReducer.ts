import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
} from "../../actions/authActions/types";
import { IAction } from ".";

const initState = {
  authToken: undefined,
};

const authReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authToken: payload.authToken,
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        authToken: payload.authToken,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        authToken: payload.authToken,
      };
    default:
      return state;
  }
};

export default authReducer;
