// imports
import express from "express";
import morgan from "morgan";
import { getConnections, getEvents, getLines, getRandomGameStations, getRanking, getStations, getUser, getUserById, updateBestScore } from "./dao.js";
import { validateRoute } from "./utils.js";
import { check, validationResult } from "express-validator";
import session from 'express-session';
import dayjs from "dayjs";

import passport from "passport";
import LocalStrategy from 'passport-local';

import cors from "cors";

// init express
const app = express();
const port = 3001;

// middlewares
app.use(express.json());
app.use(morgan("dev"));

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if(!user) 
    return cb(null, false, "Incorrect username or password.") // error message in the WWW-Authenticate header of the response

  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await getUserById(id);
    cb(null, user);
  } catch(err) {
    cb(err);
  }
});

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

app.use(session({
  secret: "shhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate("session"));

const corsOption = {
  origin: "http://localhost:5173",
  optionsSuccessState: 200,
  exposedHeaders: ["WWW-Authenticate"],
  credentials: true
};
app.use(cors(corsOption));

// ROUTES

// GET /api/lines
app.get("/api/lines", isLoggedIn, async (req, res) => {
  try {
    const lines = await getLines();
    res.json(lines);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/stations
app.get("/api/stations", isLoggedIn, async (req, res) => {
  try {
    const stations = await getStations();
    res.json(stations);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/connections
app.get("/api/connections", isLoggedIn, async (req, res) => {
  try {
    const connections = await getConnections();
    res.json(connections);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/game/start
app.get("/api/game/start", isLoggedIn, async (req, res) => {
  try {
    const { startStation, endStation } = await getRandomGameStations();

    req.session.activeGame = {
      startId: startStation.id,
      endId: endStation.id,
      startTime: dayjs().toISOString()
    }

    res.json({ startStation, endStation });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/game/execute
app.post("/api/game/execute", isLoggedIn, async (req, res) => {
  const { connections, startId, endId } = req.body;
  const activeGame = req.session.activeGame;

  // data validation
  if (!activeGame) {
    return res.status(403).json({ error: "Game not found" });
  }
  if (activeGame.startId !== startId || activeGame.endId !== endId) {
    return res.status(422).json({ error: "Start and End stations illegally modified" });
  }
  if (!connections || !Array.isArray(connections) || connections.length === 0 || !startId || !endId) {
    return res.json({ valid: false, finalScore: 0 });
  } 

  const now = dayjs();
  const startTime = dayjs(activeGame.startTime);
  const elapsedTime = now.diff(startTime, 'seconds');

  const MAX_ALLOWED_TIME = 94; // 4 s margin for request/response delays
  if(elapsedTime > MAX_ALLOWED_TIME) {
    req.session.activeGame = null;
    return res.json({ valid: false, finalScore: 0 });
  }

  try {
    const events = await getEvents();
    const validConnections = await getConnections();

    // check if sumbmitted route is valid
    const isValid = validateRoute(connections, startId, endId, validConnections);
    if (!isValid) {
      await updateBestScore(req.user.id, 0);
      return res.json({ valid: false, finalScore: 0 });
    }

    // apply random events
    let coins = 20;
    const result = connections.map(conn => {
      const event = events[Math.floor(Math.random() * events.length)];
      coins = Math.max(0, coins + event.effect);
      return {
        fromName: validConnections.find(c => c.id1 === conn.fromId)?.name1,
        toName: validConnections.find(c => c.id2 === conn.toId)?.name2,
        event: event.description,
        effect: event.effect,
        coinsAfter: coins,
      };
    });

    await updateBestScore(req.user.id, coins);
    return res.json({ valid: true, finalScore: coins, connections: result });

  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/ranking
app.get("/api/ranking", isLoggedIn, async (req, res) => {
  try {
    const ranking = await getRanking();
    res.json(ranking);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/sessions/current
app.get("/api/sessions/current", (req, res) => {
  if(req.isAuthenticated())
    res.json(req.user);
  else
    res.status(401).json({ error: "Unauthorized"});
});

// POST /api/sessions
app.post("/api/sessions", passport.authenticate("local"), function(req, res) {
  return res.status(200).json(req.user);
})

// DELETE /api/sessions/current
app.delete("/api/sessions/current", (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// activate the server
app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});