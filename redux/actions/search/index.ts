import { Trie } from "../../../services";
import { AppThunk } from "../../reducers";
import { SET_TRIE } from "./types";

export const setTrie = (trie: Trie): AppThunk => async (dispatch) => {
  dispatch({
    type: SET_TRIE,
    payload: { trie },
  });
};