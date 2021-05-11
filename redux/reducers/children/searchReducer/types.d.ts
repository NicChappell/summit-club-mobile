import Fuse from "fuse.js";
import { Trie } from "../../../../services";

export interface ISearchState {
  /** Instance of Fuse class */
  fuse?: Fuse;
  /** User provided search input */
  searchTerm: string;
  /** Instance of Trie class */
  trie?: Trie;
}
