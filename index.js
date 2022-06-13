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

pool.connect((err) => {
    if (!err) {
        console.log('Database connected');

    } else {
        console.log(err);
    }
})



 // Express part


 app.get("/",(req, res) => {
    res.send({info: "Hello express"})
 })




app.listen(3000, function(){console.log(`Server Launched at: http://localhost:3000`);} )


 // const query = `CREATE TABLE users_in_lobby(
//     id INT NOT NULL,
//     user_id INT,
//     lobby_id INT,
//     PRIMARY KEY (id)
// );`





