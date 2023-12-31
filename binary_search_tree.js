function TreeNode(value) {
  return {
    value,
    left: null,
    right: null,
  };
}

function Tree(array) {
  const _sortedArray = [...new Set(array)].sort((a, b) => a - b);

  const _buildTree = (array, start = 0, end = array.length - 1) => {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = TreeNode(array[mid]);

    root.left = _buildTree(array, start, mid - 1);
    root.right = _buildTree(array, mid + 1, end);

    return root;
  };

  let root = _buildTree(_sortedArray);

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insertNode = (value) => {
    if (!root) {
      root = TreeNode(value);
      return root;
    }

    let node = root;
    let parentNode;
    let leaf;

    while (node) {
      parentNode = node;
      if (value < node.value) {
        node = node.left;
        leaf = "left";
      } else {
        node = node.right;
        leaf = "right";
      }
    }

    parentNode[leaf] = TreeNode(value);

    return root;
  };

  const deleteNode = (value) => {
    let node = root;
    let parentNode;
    let leaf;

    while (node) {
      if (value < node.value) {
        parentNode = node;
        node = node.left;
        leaf = "left";
      } else if (value > node.value) {
        parentNode = node;
        node = node.right;
        leaf = "right";
        // Execute once node has been found
      } else {
        // If node is a leaf node
        if (!node.left && !node.right) {
          parentNode[leaf] = null;
          return root;
          // If node has a left and right child
        } else if (node.left && node.right) {
          let replacementNode = node.right;
          parentNode = node;
          leaf = "right";
          while (replacementNode.left) {
            parentNode = replacementNode;
            replacementNode = replacementNode.left;
            leaf = "left";
          }
          parentNode[leaf] = replacementNode.right;
          node.value = replacementNode.value;
          return root;
          // If node only has one child
        } else {
          parentNode[leaf] = node.left ? node.left : node.right;
          return root;
        }
      }
    }
    // Execute only if node does not exist in tree
    return root;
  };

  const findNode = (value) => {
    let node = root;

    while (node) {
      if (value < node.value) {
        node = node.left;
      } else if (value > node.value) {
        node = node.right;
      } else {
        return node;
      }
    }
    return null;
  };

  const levelOrder = (callback) => {
    if (!root) {
      return;
    }

    const array = [];
    let node;
    const queue = [root];
    while (queue.length > 0) {
      node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      callback ? array.push(callback(node.value)) : array.push(node.value);
    }

    return array;
  };

  // Private utility methods prevent node and array from being accessed as public method arguments
  const _inOrderUtil = (callback, node, array) => {
    if (!node) {
      return;
    }

    _inOrderUtil(callback, node.left, array);
    callback ? array.push(callback(node.value)) : array.push(node.value);
    _inOrderUtil(callback, node.right, array);

    return array;
  };

  const inOrder = (callback) => {
    const node = root;
    const array = [];

    return _inOrderUtil(callback, node, array);
  };

  // Private utility methods prevent node and array from being accessed as public method arguments
  const _preOrderUtil = (callback, node, array) => {
    if (!node) {
      return;
    }

    callback ? array.push(callback(node.value)) : array.push(node.value);
    _preOrderUtil(callback, node.left, array);
    _preOrderUtil(callback, node.right, array);

    return array;
  };

  const preOrder = (callback) => {
    const node = root;
    const array = [];

    return _preOrderUtil(callback, node, array);
  };

  // Private utility methods prevent node and array from being accessed as public method arguments
  const _postOrderUtil = (callback, node, array) => {
    if (!node) {
      return;
    }

    _postOrderUtil(callback, node.left, array);
    _postOrderUtil(callback, node.right, array);
    callback ? array.push(callback(node.value)) : array.push(node.value);

    return array;
  };

  const postOrder = (callback) => {
    const node = root;
    const array = [];

    return _postOrderUtil(callback, node, array);
  };

  const getHeight = (node = root, height = -1) => {
    // Return height of -1 if tree is empty
    if (!node) {
      return height;
    }

    const leftHeight = getHeight(node.left, height + 1);
    const rightHeight = getHeight(node.right, height + 1);

    return Math.max(leftHeight, rightHeight);
  };

  const getDepth = (node, rootNode = root, depth = 0) => {
    // Return height of -1 if tree is empty
    if (!rootNode || !node) {
      return -1;
    }
    if (node === rootNode) {
      return depth;
    }

    const leftDepth = getDepth(node, rootNode.left, depth + 1);
    const rightDepth = getDepth(node, rootNode.right, depth + 1);

    return Math.max(leftDepth, rightDepth);
  };

  const isBalanced = (node = root) => {
    if (!node) {
      return;
    }

    const leftHeight = getHeight(node.left);
    const rightHeight = getHeight(node.right);
    const heightDifference = Math.abs(leftHeight - rightHeight);
    return heightDifference < 2;
  };

  const rebalance = () => {
    if (!root) {
      return;
    }

    const array = inOrder();
    root = _buildTree(array);
    return root;
  };

  return {
    get root() {
      return root;
    },
    prettyPrint,
    insertNode,
    deleteNode,
    findNode,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    getHeight,
    getDepth,
    isBalanced,
    rebalance,
  };
}

module.exports = {
  TreeNode,
  Tree,
};
