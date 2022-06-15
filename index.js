const { Pool } = require("pg");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
require("dotenv").config();
const authRoutes = require("./Routes/authRoutes");

app.use(express.json());

// DB Part

const pool = new Pool();
pool.connect(async (err) => {
  try {
    await console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
});

const query = `INSERT TABLE users_in_lobby(
    id INT NOT NULL,
    user_id INT,
    lobby_id INT,
    PRIMARY KEY (id)
    );`;

// Express
app.use(authRoutes);

// app.use(async (req, res, next)=> {
//     if (!req.headers.authorization){
//         return res.status(401).send('Unauthorized')
//     }
//     try {
//         const decoded = await verify(
//             req.headers.authorization.split(' ')[1],
//             process.env.JWT_SECRET
//         )
//             if (decoded !== undefined) {
//                 req.user = decoded
//                 return next()
//             }

//     } catch (error) {
//         console.log(err);
//     }
//     return res.status(403).send('Invalid Token')
// })
// APP USE IS A MIDDLEWARE FOR UNAUTHORIZED USER'S PAGE BELOW

app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    res.send(err);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const allUsers = await pool.query(
      `SELECT * FROM users WHERE id=${req.params.id}`
    );
    res.json(allUsers.rows);
  } catch (err) {
    res.send(err);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const allUsers = await pool.query(
      `DELETE FROM users WHERE id=${req.params.id}`
    );
    res.status(201).send("User deleted");
  } catch (err) {
    res.status(500).send("Fail for delete");
    console.log(err);
  }
});

app.post("/api/users", async (req, res) => {
  const { id, username, email, created_at } = req.body;

  try {
    const pwd = req.body.password;
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(pwd, salt);
    const values = [id, username, email, hashedPwd, created_at];
    console.log(salt);
    console.log(hashedPwd);
    console.log();
    const allUsers = await pool.query(
      `INSERT INTO users VALUES($1,$2,$3, $4, $5)`,
      values
    );

    res.status(201).send("User Created");
  } catch (err) {
    res.status(401).send("Attempt Fail");
    console.log(err);
  }
});

app.listen(3000, function () {
  console.log(`Server Launched at: http://localhost:3000`);
});

// TODO: REQUEST FOR LOBBY, ADMIN, AUTHENTICATION
