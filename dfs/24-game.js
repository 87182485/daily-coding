/**
 * @param {number[]} nums
 * @return {boolean}
 */
/**
 * LC 679
 * each recursive call we pick two elements
 * i.e. [4,1,8,7] pick 8, 4 produce 8-4 = 4, 
 * [4, 1, 7] pick 7, 1 produce 7-1 = 6,
 * [4, 6] pick 4, 6 produce 4*6 = 24 return true,
 * 
 * early return can prune recursion tree.
 */
const DELTA = 0.001;
var judgePoint24 = function(nums) {
    return dfs(nums);
};

function dfs(results) {
    if(results.length===1) {
        if(Math.abs(results[0]-24.0)<=DELTA) {
            return true;
        }
        
        return false;
    }
    
    for(let i=0;i<results.length;i++) {
        for(let j=i+1;j<results.length;j++) {
            for(const c of computeResults(results[i], results[j])) {
                const nexts = [c, ...results.filter((_, index) => index!==i && index!==j)];
                if(dfs(nexts)) return true;
            }
        }
    }
    
    return false;
}

function computeResults(a, b) {
    return [a+b, a*b, a-b, b-a, a/b, b/a];
}