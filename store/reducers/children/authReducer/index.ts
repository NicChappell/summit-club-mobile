import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
} from "../../../actions/authActions/types";
import { IAction } from "../../../../common/interfaces";
import { initState } from "./constants";

const authReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN:
      return {
        ...state,
        uid: payload.uid,
      };
    case SIGN_OUT:
      return {
        ...state,
        uid: payload.uid,
      };
    case SIGN_UP:
      return {
        ...state,
        uid: payload.uid,
      };
    default:
      return state;
  }
};

export default authReducer;
