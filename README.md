[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iZes9Qfg)
# Exam #1: "Ultima corsa"
## Student: s358440 TALLONE STEFANO 

## React Client Application Routes

- Route `/`: landing page  with game instructions, visible to all users (including anonymous). Contains a link to the login page.
- Route `/login`: login form. Redirects to `/map` on success.
- Route `/map`: setup phase. Shows the full metro network map with lines, stations and connections. Only accessible to authenticated users, otherwise redirects to `/`.
- Route `/game`: planning, execution and result phases. Only accessible to authenticated users, otherwise redirects to `/`.
- Route `/ranking`: ranking board showing all users and their best score, ordered by best score descending. Only accessible to authenticated users, otherwise redirects to `/`.

## API Server

### Auth
- GET `/api/session/current`
  - request parameters: cookie for passport authentication
  - response body: user info associated with current session
  - response status: 
    - 200 OK
    - 401 Unauthorized
    - 500 Internal Server Error
  - response body example (in case of success): 
    ```
    {
      id: 1,
      username: 'steudoc'
    }
- POST `/api/session`
  - request parameters: none
  - request body: credentials { username, password }
  - response body: user info associated with the new session
  - response status:
    - 200 OK
    - 401 Unauthorized
    - 500 Internal Server Error
  - response body example (in case of success): 
    ```
    {
      id: 1,
      username: 'steudoc'
    }
- DELETE `/api/session/current`
  - request parameters: cookie for passport authentication
  - response body: none,
  - response status: 
    - 200 OK
    - 401 Unauthorized
    - 500 Internal Server Error

### Static data
- GET `/api/lines`
  - request parameters: cookie for passport authentication
  - response body: list of all lines with their ordered stations
  - response status: 
    - 200 OK
    - 401 Unauthorized
    - 500 Internal Server Error
  - response body example (in case of success): 
    ```
    [
      {
        id: 1,
        name: 'Blue Line',
        color: 'blue',
        stations: [
          { id: 1, name: 'Torino', position: 1 },
          { id: 2, name: 'Carmagnola', position: 2 },
          ...
        ]
      },
      ...
    ]
- GET `/api/stations`
  - request parameters: cookie for passport authentication
  - response body: list of all stations
  - response status: 
    - 200 OK
    - 401 Unauthorized
    - 500 Internal Server Error
  - response body example (in case of success): 
    ```
    [
      { id: 1, name: 'Torino', position: 1 },
      { id: 2, name: 'Carmagnola', position: 2 },
      ...
    ]
- GET `/api/connections`
  - request parameters: cookie for passport authentication
  - response body: list of all connections (pairs of adjacent stations on the same line)
  - response status: 
    - 200 OK
    - 401 Unauthorized
    - 500 Internal Server Error
  - response body example (in case of success): 
    ```
    [
      {
        fromId: 1,
        fromName: 'Torino',
        toId: 2,
        toName: 'Carmagnola'
      },
      ...
    ]
### Game 
GET `/api/game/start`
  - request parameters: cookie for passport authentication
  - response body: randomly assigned start and end stations (min distance: 3 stops)
  - response status: 
    - 200 OK
    - 401 Unauthorized
    - 500 Internal Server Error
  - response body example (in case of success): 
    ```
    {
      startStation: { id: 3, name: 'Cavallermaggiore' },
      endStation: { id: 9, name: 'Ceva' }
    }
POST `/api/game/execute`
  - request parameters: cookie for passport authentication
  - request body:
    ```
    {
      connections: [
        { fromId: 3, toId: 4 },
        { fromId: 4, toId: 5 },
        ...
      ]
    }
    ```
  - response body: validation result and, if valid, list of connections with their random events and running coin total; if invalid, score is 0
  - response status: 
    - 200 OK
    - 401 Unauthorized
    - 422 Unprocessable Content
    - 500 Internal Server Error
  - response body example (in case of success, valid route): 
    ```
    {
      valid: true,
      finalScore: 17,
      connections: [
        { fromName: 'Cavallermaggiore', toName: 'Savigliano', event: 'Viaggio tranquillo', effect: 0, coinsAfter: 20 },
        { fromName: 'Savigliano', toName: 'Fossano', event: 'Binario sbagliato', effect: -2, coinsAfter: 18 },
        ...
      ]
    }
### Ranking
GET `/api/ranking`
  - request parameters: cookie for passport authentication
  - response body: list of all users with their best score, ordered by best score descending
  - response status:
    - 200 OK
    - 401 Unauthorized
    - 500 Internal Server Error
  - response body example (in case of success): 
    ```
    [
      { username: 'mario.rossi', bestScore: 24 },
      { username: 'luigi.bianchi', bestScore: 18 },
      ...
    ]
    ```


## Database Tables

- Table `lines` - contains lines; identified by id; fields: (id, name, color)
- Table `stations` - contains stations; identified by id; fields: (id, name)
- Table `line_stations` - bridge table used to represent stations inside a specific line; identified by (id, line_id, station_id); fields: (id, line_id, station_id, position)
- Table `events` - contains events applied to routes; identified by id; fields: (id, description, effect)
- Table `users` - contains user data; identified by id; fields: (id, username, password (hashed), salt (for hashing a password), best_score)

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

## Use of AI Tools
Briefly describe whether you used any AI tools (e.g., ChatGPT, GitHub Copilot, Claude) while working on this project, for which purposes (e.g., clarifying concepts, debugging, generating code), and how you verified or adapted their output.
If you did not use any AI tools, simply state so.
