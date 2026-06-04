const SERVER_URL = "http://localhost:3001";

// STATIC DATA

const getLines = async () => {
    const response = await fetch(SERVER_URL + "/api/lines", {
        credentials: "include"
    });
    if (response.ok)
        return await response.json();
    else
        throw await response.json();
};

const getStations = async () => {
    const response = await fetch(SERVER_URL + "/api/stations", {
        credentials: "include"
    });
    if (response.ok)
        return await response.json();
    else
        throw await response.json();
};

const getConnections = async () => {
    const response = await fetch(SERVER_URL + "/api/connections", {
        credentials: "include"
    });
    if (response.ok)
        return await response.json();
    else
        throw await response.json();
};

// GAME

const startGame = async () => {
    const response = await fetch(SERVER_URL + "/api/game/start", {
        credentials: "include"
    });
    if (response.ok)
        return await response.json();
    else
        throw await response.json();
};

const executeGame = async (connections, startId, endId) => {
    const response = await fetch(SERVER_URL + "/api/game/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ connections, startId, endId })
    });
    if (response.ok)
        return await response.json();
    else
        throw await response.json();
};

// RANKING

const getRanking = async () => {
    const response = await fetch(SERVER_URL + "/api/ranking", {
        credentials: "include"
    });
    if (response.ok)
        return await response.json();
    else
        throw await response.json();
};

// AUTH

const logIn = async (credentials) => {
    const response = await fetch(SERVER_URL + "/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials)
    });
    if(response.ok) {
        const user = await response.json();
        return user;
    } else {
        const errDetails = response.headers.get("WWW-Authenticate");
        throw errDetails;
    }
};

const getUserInfo = async () => {
    const response = await fetch(SERVER_URL + "/api/sessions/current", {
        credentials: "include"
    });
    const user = await response.json();
    if(response.ok) 
        return user;
    else
        throw user.error;
};

const logOut = async () => {
    const response = await fetch(SERVER_URL + "/api/sessions/current", {
        method: "DELETE",
        credentials: "include"
    });
    if (response.ok) return null;
};

const API = { getLines, getStations, getConnections, getRanking, startGame, executeGame, logIn, logOut, getUserInfo };
export default API;