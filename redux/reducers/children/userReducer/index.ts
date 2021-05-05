import { RESET_USER, SET_USER } from "../../../actions/user/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";

const userReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case RESET_USER:
      return { ...initState };
    case SET_USER:
      return {
        ...state,
        account: payload.user.account,
        contact: payload.user.contact,
        summits: payload.user.summits,
      };
    default:
      return state;
  }
};

export default userReducer;
