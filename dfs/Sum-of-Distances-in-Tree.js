/**
 * @param {number} N
 * @param {number[][]} edges
 * @return {number[]}
 */
// reference here, brilliant solution, https://leetcode.com/problems/sum-of-distances-in-tree/discuss/130583/C%2B%2BJavaPython-Pre-order-and-Post-order-DFS-O(N)


/**
 * LC 834
 * 1. build graph use 2d array
 * 2. post order to update count of nodes for each sub tree
 * 3. pre order to update result.
 * 4. 
 */
var sumOfDistancesInTree = function(N, edges) {
    if(N===0) {
        return [];
    }
    
    const graph = buildGraph(edges, N);
    
    const results = Array(N).fill(0);
    const counts = Array(N).fill(0);
    
    postorder(0, -1, graph, results, counts);
    preorder(0, -1, graph, results, counts, N);
    
    return results;
};

function postorder(root, parent, graph, results, counts) {
    const nbs = graph[root];
    
    for(const n of nbs) {
        if(n===parent) continue;
        
        postorder(n, root, graph, results, counts);
        
        counts[root] += counts[n];
        results[root] += results[n] + counts[n]; 
    }
    counts[root]++;
}

function preorder(root, parent, graph, results, counts, N) {
    for(const n of graph[root]) {
        if(n===parent) continue;
        
        // When we move our root from parent to its child i, counts[n] points get 1 closer to root, N - count[n] nodes get 1           
        // futhur to root. results[n] = res[root] - count[n] + N - count[n]
        
        results[n] = (results[root] - counts[n]) + (N - counts[n]);
        
        preorder(n, root, graph, results, counts, N);
    }
}

function buildGraph(edges, N) {
    const graph = Array.from(Array(N), () => []);
    
    for(let i=0;i<edges.length;i++) {
        const [start, end] = edges[i];
        
        graph[start].push(end);
        graph[end].push(start);
    }
    
    return graph;
}