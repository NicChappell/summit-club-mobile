export type TrieNode = {
  /** indicates if current node has children or terminates the branch */
  isLeaf: boolean;
  /** object of child nodes */
  children: any;
};

export interface ISummitName {
  /** the summit name transformed to lowercase */
  lowercase: string;
  /** the original summit name */
  original: string;
}
