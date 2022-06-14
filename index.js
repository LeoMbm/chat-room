const { Pool } = require('pg');
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
require('dotenv').config()
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');


// Auth Part 

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL:process.env.issuerBaseURL 
};

// auth router attaches /login, /logout, and /callback routes to the baseURL


app.use(express.json())
app.use(auth(config));

// DB Part

const pool = new Pool;
pool.connect( async (err) => {
    try {
        await console.log('Database Connected');
    } catch (err) {
        console.log(err);
    }
})

const query = `INSERT TABLE users_in_lobby(
    id INT NOT NULL,
    user_id INT,
    lobby_id INT,
    PRIMARY KEY (id)
    );`
    
    
 
    
// -----------------------------





 // Express part

 app.get("/", (req, res) => {
     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
 })

app.get("/register", (req, res) => {
    res.json({need: "U need to login/register"})
})

app.get("/login", (req, res) => {
    res.json({need: "U need to login/register"})
})


app.use(async (req, res, next)=> {
    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized')
    }
    try {
        const decoded = await verify(
            req.headers.authorization.split(' ')[1],
            process.env.JWT_SECRET
        )
            if (decoded !== undefined) {
                req.user = decoded
                return next()
            }

    } catch (error) {
        console.log(err);
    }
    return res.status(403).send('Invalid Token')
})
// APP USE IS A MIDDLEWARE FOR UNAUTHORIZED USER'S PAGE


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


 app.delete("/api/users/:id",async (req, res) => {
    try {
        const allUsers = await pool.query(`DELETE FROM users WHERE id=${req.params.id}`)
        res.status(201).send('User deleted')
    } catch (err) {
        res.status(500).send('Fail for delete')
        console.log(err);
    }
 })

 
 
 app.post("/api/users",async (req, res) => {
const {id , username, email, created_at} = req.body

     try {
         const pwd = req.body.password
         const salt = await bcrypt.genSalt()
         const hashedPwd = await bcrypt.hash(pwd, salt)
         const values = [id, username, email, hashedPwd, created_at]
         console.log(salt);
        console.log(hashedPwd);
        console.log();
        const allUsers = await pool.query(`INSERT INTO users VALUES($1,$2,$3, $4, $5)`, values)
        
        
        res.status(201).send('User Created')
    } catch (err) {
        res.status(401).send('Attempt Fail')
        console.log(err);
    }
 })

 app.get('/admin', requiresAuth(), (req, res) =>{

    //  res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)
     res.json(req.oidc.user)
     console.log(req.oidc.user);
     
 });


 app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });
 

app.listen(3000, function(){console.log(`Server Launched at: http://localhost:3000`);} )




// TODO: REQUEST FOR LOBBY, ADMIN, AUTHENTICATION 

        //  function create(user, callback) {
        //     //this example uses the "pg" library
        //     //more info here: https://github.com/brianc/node-postgres
        
        //     try {
        //         const bcrypt = require('bcrypt');
        //         const postgres = require('pg');
              
        //         const conString = process.env.POSTGRES_URL;
        //         postgres.connect(conString, function (err, client, done) {
        //           if (err) return callback(err);
              
        //           bcrypt.hash(user.password, 10, function (err, hashedPassword) {
        //             if (err) return callback(err);
              
        //             const query = 'INSERT INTO users(email, password) VALUES ($1, $2)';
        //             client.query(query, [user.email, hashedPassword], function (err, result) {
        //               // NOTE: always call `done()` here to close
        //               // the connection to the database
        //               done();
              
        //               return callback(err);
        //             });
        //           });
        //         });
                
        //     } catch (err) {
        //         console.log(err);
                
        //     }
          
           
        //   }
