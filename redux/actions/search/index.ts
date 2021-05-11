import Fuse from "fuse.js";
import { Trie } from "../../../services";
import { AppThunk } from "../../reducers";
import { SET_FUSE, SET_SEARCH_TERM, SET_TRIE } from "./types";

export const setFuse = (fuse: Fuse<any>): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_FUSE,
    payload: { fuse },
  });
};

export const setSearchTerm = (searchTerm: string): AppThunk => async (
  dispatch
) => {
  dispatch({
    type: SET_SEARCH_TERM,
    payload: { searchTerm },
  });
};

export const setTrie = (trie: Trie): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_TRIE,
    payload: { trie },
  });
};
