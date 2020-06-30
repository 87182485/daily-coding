/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

 // LC 513, comment BFS solution,
 // DFS, pass level for each traversal. 
var findBottomLeftValue = function(root) {
    // BFS
    
//     const queue = [];
    
//     queue.push(root);
    
//     while(queue.length) {
//         const size = queue.length;
        
//         const candidate = {...queue[0]};
        
//         for(let i=0;i<size;i++) {
//             const current = queue.shift();
            
//             if(current.left) {
//                 queue.push(current.left);
//             }
            
//             if(current.right) {
//                 queue.push(current.right);
//             }
//         }
        
//         if(!queue.length) {
//             return candidate.val;
//         }
//     }
    
//     return null;
    
    // DFS
    
    function dfs(root, level, isLeft) {
        if(!root) {
            return { level: -1 };
        }
        
        if(!root.left && !root.right) {
            return { node: root, level };
        }
        
        const left = dfs(root.left, level+1);
        const right = dfs(root.right, level+1);
        
        if(left.level === -1) {
            return right;
        } else {
            return left.level >= right.level ? left : right;
        }
    }
    
    const leftMost = dfs(root, 0);
    
    return leftMost.node.val;
};