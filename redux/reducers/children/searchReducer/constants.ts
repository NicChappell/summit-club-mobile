import { ISearchState } from "./types";

export const initState: ISearchState = {
  fuse: undefined,
  searchTerm: "",
  summitNames: undefined,
  trie: undefined,
};
