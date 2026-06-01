// imports
import express from "express";
import morgan from "morgan";
import { getLines, getStations, getUser, getUserById } from "./dao.js";
import { check, validationResult } from "express-validator";
import session from 'express-session';

import passport from "passport";
import LocalStrategy from 'passport-local';

import cors from "cors";

// init express
const app = new express();
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

//

// ROUTES

// GET /api/session/current
app.get("/api/session/current", (req, res) => {
  if(req.isAuthenticated())
    res.json(req.user);
  else
    res.status(401).json({ error: "Unauthorized"});
});

// POST /api/session
app.post("/api/session", passport.authenticate("local"), function(req, res) {
  return res.status(200).json(req.user);
})

// DELETE /api/session/current
app.delete("/api/session/current", (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// activate the server
app.listen(port, () => {
  console.log(`API server started at http://localhost:${port}`);
});