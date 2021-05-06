export class Trie {
  constructor() {
    this.suggestions = [];
    this.trie = null;
  }

  suggestions: string[];
  trie: any;

  add(word: string) {
    if (!this.trie) this.trie = this.newNode();

    let root = this.trie;
    for (const letter of word) {
      if (!(letter in root.children)) {
        root.children[letter] = this.newNode();
      }
      root = root.children[letter];
    }
    root.isLeaf = true;
  }

  clear() {
    this.suggestions = [];
  }

  complete(word: string, CHILDREN: any = null) {
    const root = this.find(word);

    if (!root) return this.suggestions; // cannot suggest anything

    const children = root.children;

    let spread = 0;

    for (const letter in children) {
      this.traverse(children[letter], word + letter);
      spread++;

      if (CHILDREN && spread === CHILDREN) break;
    }

    return this.suggestions;
  }

  find(word: string) {
    let root = this.trie;
    for (const letter of word) {
      if (letter in root.children) {
        root = root.children[letter];
      } else {
        return null;
      }
    }

    return root;
  }

  newNode() {
    return {
      isLeaf: false,
      children: {},
    };
  }

  print() {
    console.log(this.trie);
  }

  traverse(
    root: {
      isLeaf: boolean;
      children: any;
    },
    word: string
  ) {
    if (root.isLeaf) {
      this.suggestions.push(word);
      return;
    }

    for (const letter in root.children) {
      this.traverse(root.children[letter], word + letter);
    }
  }
}
