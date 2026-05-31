[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iZes9Qfg)
# Exam #1: "Ultima corsa"
## Student: s123456 LASTNAME FIRSTNAME 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

### Auth
- GET `/api/session/current`
  - retrieve user information
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
  - login
  - request parameters: none
  - request body: credentials { username, password }
  - response body: user info associated with the new session
  - response
- DELETE `/api/session/current`
  - logout


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
