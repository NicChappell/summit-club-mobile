import { ISummitName, TrieNode } from "./types";

class Trie {
  constructor() {
    this.suggestions = [];
    this.trie = null;
  }

  suggestions: string[];
  trie: any;

  add(word: string) {
    // create root node if trie is null
    if (!this.trie) this.trie = this.newNode();

    // set root node
    let root = this.trie;

    // iterate over each letter of word
    for (const letter of word) {
      // check root node's children for current letter
      if (!(letter in root.children)) {
        // create new child node if first encounter of current letter
        root.children[letter] = this.newNode();
      }

      // reset root node to current letter
      root = root.children[letter];
    }

    // terminate current branch
    root.isLeaf = true;
  }

  clear() {
    this.suggestions = [];
  }

  complete(word: string, CHILDREN: number = 0) {
    // set root node
    const root = this.find(word);

    if (!root) return this.suggestions; // cannot suggest anything

    // destructure root node
    const { children } = root;

    // create counter
    let count = 0;

    // iterate over each child node
    for (const letter in children) {
      // traverse children nodes to find suggestions
      this.traverse(children[letter], word + letter);

      // increment counter
      count++;

      // break out of loop at limit
      if (Boolean(CHILDREN) && count === CHILDREN) break;
    }

    return this.suggestions;
  }

  find(word: string): TrieNode | null {
    // set root node
    let root = this.trie;

    // iterate over each letter of word
    for (const letter of word) {
      // check root node's children for current letter
      if (letter in root.children) {
        // reset root node to current letter
        root = root.children[letter];
      } else {
        return null; // no matching nodes
      }
    }

    return root; // matched node
  }

  newNode(): TrieNode {
    return {
      isLeaf: false,
      children: {},
    };
  }

  print() {
    console.log(this.trie);
  }

  traverse(root: TrieNode, word: string) {
    // check for additional children to traverse
    if (root.isLeaf) {
      // add word to suggestions
      this.suggestions.push(word);

      return; // no additional children to traverse
    }

    // iterate over each child node
    for (const letter in root.children) {
      // traverse children nodes until branches are terminated
      this.traverse(root.children[letter], word + letter);
    }
  }
}

export default Trie;

export { ISummitName, TrieNode };
