const { Tree } = require("./binary_search_tree");

function randomArrayBelowHundred() {
  // +1 to ensure array has min length 1
  const array = [];
  const arrayLength = Math.floor(Math.random() * 20 + 1);
  for (let i = 0; i < arrayLength; i++) {
    array.push(Math.floor(Math.random() * 99 + 1));
  }
  return array;
}

function randomArrayAboveHundred() {
  // +1 to ensure array has min length 1
  const array = [];
  const arrayLength = Math.floor(Math.random() * 20 + 1);
  for (let i = 0; i < arrayLength; i++) {
    array.push(Math.floor(Math.random() * 99 + 100));
  }
  return array;
}

let array = randomArrayBelowHundred();
const tree = Tree(array);
tree.prettyPrint();

console.log(tree.isBalanced());

console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());

array = randomArrayAboveHundred();
for (const num of array) {
  tree.insertNode(num);
}
tree.prettyPrint();

console.log(tree.isBalanced());
console.log(tree.rebalance());
tree.prettyPrint();

console.log(tree.isBalanced());
console.log(tree.levelOrder());
console.log(tree.preOrder());
console.log(tree.inOrder());
console.log(tree.postOrder());
