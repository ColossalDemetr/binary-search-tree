/* function createBST(array, start, end) {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const root = new TreeNode(array[mid]);

  root.setLeft(createBST(array, start, mid - 1));
  root.setRight(createBST(array, mid + 1, end));

  return root;
} */

  class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    };
  };

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    };

};