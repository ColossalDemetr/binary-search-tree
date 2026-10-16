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

    // #1
    buildTree(array) {
        array.sort((a, b) => a - b);
        const duplicateRemover = [...new Set(array)];
        return this.buildTreeBalanced(duplicateRemover);
    };

    buildTreeBalanced(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const newNode = new Node(array[mid]);

        newNode.left = this.buildTreeBalanced(array.slice(0, mid));
        newNode.right = this.buildTreeBalanced(array.slice(mid + 1));

        return newNode;
    };


    includes(value) {
        let current = this.root;

        while(current !== null) {
            if (current.data === value) {
                return true;
            }

            if (value < current.data) {current = current.left} else {current = current.right};
        };

        return false;
    };

};


export { Node, Tree };