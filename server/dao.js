/* Data Access Object (DAO) for accessing database*/

import sqlite from "sqlite3";
import crypto from "crypto";
import { Line, Station, Event } from './models.js'

const db = new sqlite.Database("database.db", (err) => {
    if (err) throw err;
});

export const getLines = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT L.id as lineId, L.name as lineName, L.color, S.id as stationId, S.name as stationName, LS.position
            FROM lines L
            JOIN line_stations LS ON L.id = LS.line_id
            JOIN stations S ON S.id = LS.station_id
            ORDER BY L.id, LS.position
            `;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const linesMap = {};
                for (const row of rows) {
                    if (!linesMap[row.lineId]) {
                        linesMap[row.lineId] = new Line(row.lineId, row.lineName, row.color);
                        linesMap[row.lineId].stations = [];
                    }
                    linesMap[row.lineId].stations.push(new Station(row.stationId, row.stationName));
                }
                resolve(Object.values(linesMap));
            }
        });
    });
}

export const getStations = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM stations ORDER BY name";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const stations = rows.map(row => new Station(row.id, row.name));
                resolve(stations);
            }
        });
    });
}

export const getStationById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM stations WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err)
                reject(err);
            else if (!row)
                resolve(null);
            else
                resolve(new Station(row.id, row.name));
        });
    });
}

export const getConnections = () => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT S1.id as id1, S1.name as name1, S2.id as id2, S2.name as name2
            FROM line_stations LS1
            JOIN line_stations LS2 ON LS2.line_id = LS1.line_id AND LS2.position = LS1.position + 1
            JOIN stations S1 ON S1.id = LS1.station_id
            JOIN stations S2 ON S2.id = LS2.station_id
        `;
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const connections = rows.map(row => ({ 
                    id1: row.id1, 
                    name1: row.name1, 
                    id2: row.id2, 
                    name2: row.name2 
                }));
                resolve(connections);
            }
        });
    });
}

export const getRandomGameStations = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const connections = await getConnections();

            // build adjacency list
            const graph = {};
            for (const conn of connections) {
                if (!graph[conn.id1]) 
                    graph[conn.id1] = [];
                if (!graph[conn.id2])
                    graph[row.id2] = [];
                graph[conn.id1].push(conn.id2);
                graph[conn.id2].push(conn.id1); //bidirectional
            }

            // bfs to find distance between two stations (ricerca in ampiezza)
            const bfs = (start, end) => {
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

            // find valid pairs (dist>3)
            const stationIds = Object.keys(graph).map(Number);
            const validPairs = [];
            for (let i = 0; i < stationIds.length; i++) {
                for (let j = i + 1; j < stationIds.length; j++) {
                    const dist = bfs(stationIds[i], stationIds[j]);
                    if (dist >= 3) {
                        validPairs.push({
                            startId: stationIds[i],
                            endId: stationIds[j],
                        });
                    }
                }
            }

            if (validPairs.length === 0)
                reject(new Error("No valid pairs found"));
            // pick random pair
            const pair = validPairs[Math.floor(Math.random() * validPairs.length)];
            
            const startStation = await getStationById(pair.startId);
            const endStation = await getStationById(pair.endId);

            resolve({ startStation, endStation });
        } catch(err) {
            reject(err);
        }
    });
}

export const getEvents = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM events";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                const events = rows.map(row => new Event(row.id, row.description, row.effect));
                resolve(events);
            }
        });
    });
}

export const updateBestScore = (userId, score) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE users SET best_score = ? WHERE id = ? AND best_score < ?";
        db.run(sql, [score, userId, score], (err) => {
            if(err) 
                reject(err);
            else
                resolve();
        });
    });
}

export const getRanking = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, username, best_score FROM users ORDER BY best_score DESC";
        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else {
                resolve(rows);
            }
        });
    });
}

// USER
export const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE username = ?";
        db.get(sql, [username], (err, row) => {
            if (err) {
                reject(err);
            } else if (row == undefined) {
                resolve(false);
            } else {
                const user = { id: row.id, username: row.username, best_score: row.best_score };

                crypto.scrypt(password, row.salt, 32, function(err, hashedPassword) {
                    if (err) reject(err);
                    if (!crypto.timingSafeEqual(Buffer.from(row.password, "hex"), hashedPassword))
                        resolve(false);
                    else
                        resolve(user);
                });
            }
        });
    });
}