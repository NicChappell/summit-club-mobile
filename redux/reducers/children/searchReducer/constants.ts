import { ISearchState } from "./types";

export const initState: ISearchState = {
  fuse: undefined,
  searchTerm: "",
  trie: undefined,
};
