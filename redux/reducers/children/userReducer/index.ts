import { SET_USER } from "../../../actions/user/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";
import { IUserState } from "./types";

const userReducer = (state = initState, action: IAction<IUserState>) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return {
        account: payload.account,
        contact: payload.contact,
        id: payload.id,
        summits: payload.summits,
      };
    default:
      return state;
  }
};

export default userReducer;
