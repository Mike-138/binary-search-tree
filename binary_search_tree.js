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
    }

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
                    // TODO
                // If node has a left and right child
                } else if (currentNode.left && currentNode.right) {
                    // TODO
                // If node only has one child
                } else {
                    // TODO
                }
            }
        }
        // Execute only if node does not exist in tree
        return root;
    }

    return {
        get root() {
            return root;
        },
        insertNode
    }
}

module.exports = {
    TreeNode,
    Tree
}