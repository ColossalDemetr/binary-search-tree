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

    insert(value) {
        let current = this.root;
        let parent = null;

        while(current !== null) {
            if (current.data === value) {
                return;
            };

            if (value < current.data) {
                parent = current; 
                current = current.left; 
            } else {
                parent = current; 
                current = current.right;
            };
        };

        let newNode = new Node(value);

        value < parent.data ? parent.left = newNode : parent.right = newNode;
        
    };

    // Additional methods for deleteItem();
    findMin(node) {
        let current = node;
        while (current !== null) {
            if (current.left === null) return current;
            current = current.left;
        };

        return current;

    };

    deleteNode(node, value) {
        if (node === null) return null;
        
        if (value < node.data) {
            node.left = this.deleteNode(node.left, value)
        } else if (value > node.data) {
            node.right = this.deleteNode(node.right, value)
        } else {
            if (node.left === null) return node.right;
            else if (node.right === null) return node.left;
            else {
                const successorValue = this.findMin(node.right).data;
                node.data = successorValue;
                node.right = this.deleteNode(node.right, successorValue);
            };
        }
        
        return node;
    };

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    };

    levelOrderForEach(callback) {

        let current = this.root;
        if (!callback) throw new Error("Callback is required!");
        if (current === null) return;

        const queue = [current];

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node.data);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        };

    };

    // Same but recursive
    levelOrderForEachRecursive(queue, callback) {
        if (!callback) throw new Error("Callback is required!");
        if (queue.length === 0) return;
        
            const node = queue.shift();
            callback(node.data);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);


        this.levelOrderForEachRecursive(queue, callback);

        
    };

};


export { Node, Tree };