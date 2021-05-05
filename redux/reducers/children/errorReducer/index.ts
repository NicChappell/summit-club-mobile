import { CLEAR_ERROR, SET_ERROR } from "../../../actions/error/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";

const errorReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case CLEAR_ERROR:
      return {
        code: payload.code,
        message: payload.message,
      };
    case SET_ERROR:
      return {
        code: payload.code,
        message: payload.message,
      };
    default:
      return state;
  }
};

export default errorReducer;
