import Fuse from "fuse.js";
import { Trie } from "../../../services";
import { AppThunk } from "../../reducers";
import { SET_FUSE, SET_TRIE } from "./types";

export const setFuse = (fuse: Fuse<any>): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_FUSE,
    payload: { fuse },
  });
};

export const setTrie = (trie: Trie): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_TRIE,
    payload: { trie },
  });
};
