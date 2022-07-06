# LokkerRoom a chat for teachers and learners(Backend only) !

(Client side in progress...)

## Stack

- [PostgreSQL](https://www.postgresql.org/docs/)
- [Express](https://expressjs.com/)
- [Node](https://nodejs.org/en/docs/)

## Available Scripts

Before use, run `npm i` for installing all dependencies

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### List of endpoints

Here is the endpoints you could use.

| Endpoint               | Method | Token?         | Request                  |
| ---------------------- | ------ | -------------- | ------------------------ |
| /api/users             | GET    |                | All the users            |
| /api/users/{id}        | GET    |                | A single user from ID    |
| /api/lobby             | GET    |                | All lobby                |
| /api/lobby/{id}        | GET    |                | A single lobby from ID   |
| /api/usersinlobby      | GET    |                | All users in lobby       |
| /api/messages          | GET    |                | All messages             |
| /api/messages/{id}     | GET    |                | A single message from ID |
| /logout                | GET    | destroy cookie | Disconnect user          |
| /signup                | POST   |                | Create an user           |
| /login                 | POST   | create cookie  | Login user               |
| /api/lobby             | POST   |                | Create a lobby           |
| /api/usersinlobby      | POST   |                | Add user to a lobby      |
| /api/messages          | POST   |                | Create/Send Messages     |
| /api/users/{id}        | DELETE |                | Delete an user           |
| /api/lobby/{id}        | DELETE |                | Delete a lobby           |
| /api/usersinlobby/{id} | DELETE |                | Delete an user in lobby  |
| /api/messages/{id}     | DELETE |                | Delete a message         |


