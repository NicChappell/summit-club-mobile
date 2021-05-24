import { SET_USER } from "../../../actions/user/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";
import { IUserState } from "./types";

const userReducer = (state = initState, action: IAction<IUserState>) => {
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
