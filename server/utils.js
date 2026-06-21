// bfs to find distance between two stations (Breadth-First Search -> "ricerca in ampiezza")
// returns infinite if the two stations are not reachable
export const bfs = (start, end, graph) => {
    const visited = new Set();
    const queue = [[start, 0]];
    visited.add(start);

    while (queue.length > 0) {
        const [node, dist] = queue.shift();
        if (node === end) 
            return dist;

        for (const neighbor of (graph[node] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }
    return Infinity;
};

// checks that the sumbmitted route is compliant with the game's rules
export const validateRoute = (connections, startId, endId, validConnections) => {
    // check route starts and ends correctly
    if (connections[0].id1 !== startId && connections[0].id2 !== startId) return false;
    if (connections[connections.length - 1].id1 !== endId && connections[connections.length - 1].id2 !== endId) return false;

    let currentNode = startId;

    // check each connection exists and is contiguous
    for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];

        const exists = validConnections.some(c => 
            (c.id1 === conn.id1 && c.id2 === conn.id2) ||
            (c.id1 === conn.id2 && c.id2 === conn.id1)
        );
        if (!exists) return false;

        // check continuity
        if (i < connections.length - 1) {
            if (conn.id1 !== connections[i + 1].id1 
                && conn.id1 !== connections[i + 1].id2
                && conn.id2 !== connections[i + 1].id1
                && conn.id2 !== connections[i + 1].id2) return false;
        }

        if (conn.id1 === currentNode) {
            currentNode = conn.id2;
        } else if (conn.id2 === currentNode) {
            currentNode = conn.id1;
        } else {
            return false;
        }

        /* Note: line changes are implicitly validated. 
        If a continuous path exists between two connections of different lines, 
        the shared station is, by definition, an interchange station. */
    }

    return true;
}