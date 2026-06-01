const SERVER_URL = "http://localhost:3001";

// STATIC DATA

// GAME

// RANKING

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