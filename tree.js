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

    inOrderForEach(callback) {
        let current = this.root;

        if (!callback) throw new Error('Callback is required!');
        if (current === null) return;

        function traverse(node) {
            if (node === null) return;


            traverse(node.left);
            callback(node.data);
            traverse(node.right);

        };

        traverse(current);

    };

    preOrderForEach(callback) {
        let current = this.root;

        if (!callback) throw new Error('Callback is required!');
        if (current === null) return;

        function traverse(node) {
            if (node === null) return;


            callback(node.data);
            traverse(node.left);
            traverse(node.right);

        };

        traverse(current);        
    };

    postOrderForEach(callback) {
        let current = this.root;

        if (!callback) throw new Error('Callback is required!');
        if (current === null) return;

        function traverse(node) {
            if (node === null) return;

            traverse(node.left);
            traverse(node.right);
            callback(node.data);

        };

        traverse(current);  
    };

    // Helpers for height(value)

    getHeight(node) {
        if (node === null) return -1;

        return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    };

    // 
    height(value) {
        let current = this.root;
        if (!this.includes(value)) return undefined;

       while (current !== null) {
            if (current.data === value) return this.getHeight(current);

            if (value < current.data) current = current.left;
            else current = current.right;
       };

    };

    depth(value) {
        let current = this.root;
        let counter = 0;
        if(!this.includes(value) || current.data === null) return undefined;

        while (current.data !== value) {

            if (value < current.data) {
                current = current.left;
                counter++;
            } else {
                current = current.right;
                counter++;
            };
        };

        return counter;
    };

    checkBalanced(node) {
        if (node === null) return true;
        if (Math.abs(this.getHeight(node.left) - this.getHeight(node.right)) > 1) return false;

        if(!this.checkBalanced(node.left)) return false;
        if(!this.checkBalanced(node.right)) return false;


        return true;
    };

    isBalanced() {
        return this.checkBalanced(this.root);
    };

};


export { Node, Tree };