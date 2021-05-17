import { SET_DATABASE } from "../../../actions/database/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";

const databaseReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case SET_DATABASE:
      return {
        ...state,
        database: payload.database,
      };
    default:
      return state;
  }
};

export default databaseReducer;
