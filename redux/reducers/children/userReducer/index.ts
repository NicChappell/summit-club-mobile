import { SET_USER } from "../../../actions/user/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";

const userReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { ...payload };
    default:
      return state;
  }
};

export default userReducer;
