import Fuse from "fuse.js";
import { Trie } from "../../../../services";

export interface ISearchState {
  /** Instance of Fuse class */
  fuse?: Fuse;
  /** Instance of Trie class */
  trie?: Trie;
}
