import { Node, Tree } from './tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {

    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


// DriverScript

const arr = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 1);
const tree = new Tree(arr);


const isThisBalanced = tree.isBalanced();


const printInOrder = tree.inOrderForEach(value => console.log(value));
const printPreOrder = tree.preOrderForEach(value => console.log(value));
const printPostOrder = tree.postOrderForEach(value => console.log(value));

tree.insert(101);
tree.insert(52151);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

prettyPrint(tree.root);