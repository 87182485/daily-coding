/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */

 // LC - 863
 // use hash map and BFS.
var distanceK = function(root, target, K) {
    const map = new WeakMap(); // allow object as key of the map.
    
    const result = [];
    
    buildGraphMap(map, root, null);
    
    if(!map.has(target)) {
        return result;
    }
    
    const visited = new Set();
    
    visited.add(target);
    
    let queue = [];
    queue.push(target);
    
    while(queue.length) {
        const size = queue.length;
        
        if(K===0) {
            for(let i=0;i<size;i++) {
                result.push(queue.shift().val);
            }
        } else {
            for(let i=0;i<size;i++) {
                const current = queue.shift();
                const nexts = map.get(current);
                
                if (nexts) {
                    for(let j=0;j<nexts.length;j++) {
                        if(!visited.has(nexts[j])) {
                            visited.add(nexts[j]);
                            queue.push(nexts[j]);
                        }
                    }
                }
            }
        }
        
        K--;
    }
    
    return result;
};

function buildGraphMap(map, root, parent) {
    if(!root) {
        return;
    }
    
    if(!map.has(root)) {
        map.set(root, []);
        
        if(parent) {
            map.get(parent).push(root);
            map.get(root).push(parent);
        }
        
        buildGraphMap(map, root.left, root);
        buildGraphMap(map, root.right, root);
    }
}