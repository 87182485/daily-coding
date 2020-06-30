/**
 * @param {number[][]} A
 * @return {number}
 */

// LC 934
// Combine DFS + BFS to solve this problem.
var shortestBridge = function(A) {
    const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    
    const row = A.length;
    const col = A[0].length;
    
    const visited = Array.from(Array(row), () => Array(col).fill(false));
    
    const queue = [];
    
    let found = false;
    
    for(let i=0;i<row;i++) {
        if(found) {
            break;
        }
        for(let j=0;j<col;j++) {
            if(A[i][j]===1) { // start from the 1st '1', and DFS traversal all connected 1s
                findIsland(A, i, j, row, col, dirs, queue, visited);
                found = true;
                break;
            }
        }
    }
    
    let result = 0; // init step.
    
    // BFS, find the first element that touch the land of another island.
    while(queue.length) {
        const size = queue.length;
        
        for(let i=0;i<size;i++) {
            const [currentX, currentY] = queue.shift();
            
            for(let k=0;k<dirs.length;k++) {
                const [dx, dy] = dirs[k];
                
                const nextX = currentX + dx;
                const nextY = currentY + dy;
                
                if(isValid(nextX, nextY, row, col) && !visited[nextX][nextY]) {
                    if(A[nextX][nextY] === 1) {
                        return result;
                    }
                    
                    queue.push([nextX, nextY]);
                    visited[nextX][nextY] = true;
                }
            }
        }
        
        result++;
    }
    
    return -1;
};

// DFS part 
function findIsland(A, x, y, row, col, dirs, queue, visited) {
    if(!isValid(x, y, row, col) || visited[x][y] || A[x][y] === 0) {
        return;
    }
    
    visited[x][y] = true;
    
    queue.push([x, y]);
    
    for(let i=0;i<dirs.length;i++) {
        const [dx, dy] = dirs[i];
        
        findIsland(A, x+dx, y+dy, row, col, dirs, queue, visited);
    }
}

function isValid(x, y, row, col) { // check if current coordinates is not out of the board
    return x >= 0 && y >= 0 && x < row && y < col;
}