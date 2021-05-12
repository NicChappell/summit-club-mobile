import {
  SET_FUSE,
  SET_SEARCH_TERM,
  SET_SUMMIT_NAMES,
  SET_TRIE,
} from "../../../actions/search/types";
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
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: payload.searchTerm,
      };
    case SET_SUMMIT_NAMES:
      return {
        ...state,
        summitNames: payload.summitNames,
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
