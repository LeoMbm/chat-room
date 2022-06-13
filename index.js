const { Pool } = require('pg');
const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())
// DB Part

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD, 
    port: process.env.PGPORT,
    database: process.env.PGDB,
});

const query = `INSERT TABLE users_in_lobby(
    id INT NOT NULL,
    user_id INT,
    lobby_id INT,
    PRIMARY KEY (id)
);`




pool.connect( async (err) => {
    try {
        await console.log('Database Connected');
    } catch (err) {
        console.log(err);
    }
})



 // Express part

app.get("/", (req, res) => {
    res.json({info: "please login"})
})


 app.get("/api/users",async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users')
        res.json(allUsers.rows)
    } catch (err) {
        res.send(err)
    }
 })

 app.get("/api/users/:id",async (req, res) => {
    try {
        const allUsers = await pool.query(`SELECT * FROM users WHERE id=${req.params.id}`)
        res.json(allUsers.rows)
    } catch (err) {
        res.send(err)
    }
 })





app.listen(3000, function(){console.log(`Server Launched at: http://localhost:3000`);} )





