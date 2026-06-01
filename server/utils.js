import { getConnections } from "./dao.js";

// bfs to find distance between two stations (ricerca in ampiezza)
export const bfs = (start, end) => {
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
export const validateRoute = async (connections, startId, endId) => {
    // check route starts and ends correctly
    if (connections[0].fromId !== startId) return false;
    if (connections[connections.length - 1].toId !== endId) return false;

    const validConnections = await getConnections();

    // check each connection exists and is contiguous
    for (let i = 0; i < connections.length; i++) {
        const conn = connections[i];

        const exists = validConnections.some(c => 
            (c.id1 === conn.fromId && c.id2 === conn.toId) ||
            (c.id1 === conn.toId && c.id2 === conn.fromId)
        );
        if (!exists) return false;

        // check continuity
        if (i < connections.length - 1) {
            if (conn.toId !== connections[i + 1].fromId) return false;
        }

        /* Note: line changes are implicitly validated. 
        If a continuous path exists between two connections of different lines, 
        the shared station is, by definition, an interchange station. */
    }

    return true;
}