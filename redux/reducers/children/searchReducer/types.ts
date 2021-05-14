import Fuse from "fuse.js";
import { ISummitName, Trie } from "../../../../services";

export interface ISearchState {
  /** Instance of Fuse class */
  fuse?: Fuse<ISummitName>;
  /** User provided search input */
  searchTerm: string;
  /** Summit names formatted for search */
  summitNames?: ISummitName[];
  /** Instance of Trie class */
  trie?: Trie;
}
