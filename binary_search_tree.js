function TreeNode(value) {
    return {
        value,
        left: null,
        right: null
    }
}

function Tree(array) {

    const _sortedArray = [...new Set(array)].sort((a, b) => a - b);

    const _buildTree = (array, start, end) => {

        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const root = TreeNode(array[mid]);

        root.left = _buildTree(array, start, mid - 1);
        root.right = _buildTree(array, mid + 1, end);

        return root;
    }

    let root = _buildTree(_sortedArray, 0, _sortedArray.length - 1);

    const prettyPrint = (node, prefix = "", isLeft = true) => {
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

        let currentNode = root;
        let parentNode;
        let leaf;

        while (currentNode) {
            parentNode = currentNode;
            if (value < currentNode.value) {
                currentNode = currentNode.left;
                leaf = "left";
            } else {
                currentNode = currentNode.right;
                leaf = "right";
            }
        }

        parentNode[leaf] = TreeNode(value);

        return root;
    };

    const deleteNode = (value) => {
        let currentNode = root;
        let parentNode;
        let leaf;

        while (currentNode) {
            if (value < currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.left;
                leaf = "left";
            } else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
                leaf = "right";
            // Execute once node has been found
            } else {
                // If node is a leaf node
                if (!currentNode.left && !currentNode.right) {
                    parentNode[leaf] = null;
                    return root;
                // If node has a left and right child
                } else if (currentNode.left && currentNode.right) {
                    let replacementNode = currentNode.right;
                    parentNode = currentNode;
                    leaf = "right";
                    while (replacementNode.left) {
                        parentNode = replacementNode;
                        replacementNode = replacementNode.left;
                        leaf = "left";
                    }
                    parentNode[leaf] = replacementNode.right;
                    currentNode.value = replacementNode.value;
                    return root;
                // If node only has one child
                } else {
                    parentNode[leaf] = (currentNode.left) ? currentNode.left : currentNode.right;
                    return root;
                }
            }
        }
        // Execute only if node does not exist in tree
        return root;
    };

    const findNode = (value) => {
        let currentNode = root;

        while (currentNode) {
            if (value < currentNode.value) {
                currentNode = currentNode.left;
            } else if (value > currentNode.value) {
                currentNode = currentNode.right;
            } else {
                return currentNode;
            }
        }
        return null;
    };

    const levelOrder = (callback) => {
        if (!root) {
            return;
        }

        let orderedArray = [];
        let currentNode;
        let operatedNodeValue;
        let queue = [root];
        while (queue.length > 0) {
            currentNode = queue.shift();
            if (currentNode.left) queue.push(currentNode.left);
            if (currentNode.right) queue.push(currentNode.right);
            if (callback) {
                operatedNodeValue = callback(currentNode.value);
                orderedArray.push(operatedNodeValue)
            } else {
                orderedArray.push(currentNode.value);
            }
        }

        return orderedArray;
    }

    // TODO
    const inOrder = (callback) => {
        if (!root) {
            return;
        }

        let orderedArray = [];
        let currentNode;
        let operatedNodeValue;
        while (queue.length > 0) {
            if (callback) {
                operatedNodeValue = callback(currentNode.value);
                orderedArray.push(operatedNodeValue)
            } else {
                orderedArray.push(currentNode.value);
            }
        }

        return orderedArray;
    }


    // TODO
    const preOrder = (callback) => {
        if (!root) {
            return;
        }

        let orderedArray = [];
        let currentNode;
        let operatedNodeValue;
        while (queue.length > 0) {
            if (callback) {
                operatedNodeValue = callback(currentNode.value);
                orderedArray.push(operatedNodeValue)
            } else {
                orderedArray.push(currentNode.value);
            }
        }

        return orderedArray;
    }

    // TODO
    const postOrder = (callback) => {
        if (!root) {
            return;
        }

        let orderedArray = [];
        let currentNode;
        let operatedNodeValue;
        while (queue.length > 0) {
            if (callback) {
                operatedNodeValue = callback(currentNode.value);
                orderedArray.push(operatedNodeValue)
            } else {
                orderedArray.push(currentNode.value);
            }
        }

        return orderedArray;
    }

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
        postOrder
    }
}

module.exports = {
    TreeNode,
    Tree
}