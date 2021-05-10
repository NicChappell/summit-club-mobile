import { SET_FUSE, SET_TRIE } from "../../../actions/search/types";
import { IAction } from "../../../../common/types";
import { initState } from "./constants";

const summitsReducer = (state = initState, action: IAction) => {
  // destructure action
  const { type, payload } = action;

  switch (type) {
    case SET_FUSE:
      return {
        ...state,
        fuse: payload.fuse,
      };
    case SET_TRIE:
      return {
        ...state,
        trie: payload.trie,
      };
    default:
      return state;
  }
};

export default summitsReducer;
