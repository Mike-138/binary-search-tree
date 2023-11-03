function Node(value) {
    this.value = value;
    this.right = null;
    this.left = null;
}

function Tree(array) {

    const _buildTree = () => {
        // TODO: IMPLEMENT
    }

    this.root = _buildTree();

    return {
        get root() {
            return this.root
        }
    }
}