const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const ejs = require("ejs");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoutes");
const viewsRoutes = require("./Routes/viewsRoute");
const dataRoutes = require("./Routes/dataRoutes");
const { pool } = require("./db/dbConfig");

app.set("view engine", "ejs"); // Allows us to see the ejs HTML templates.
app.use(express.json()); // Allows for the API to work.
app.use(express.static("public")); // Allows for the public directory to be easily accessed on the server.
app.use(cookieParser());

// DB Part

pool.connect(async (err) => {
  try {
    await console.log("Database Connected");
  } catch (err) {
    console.log(err);
  }
});

// Express
app.use(authRoutes);
app.use(viewsRoutes);
app.use(dataRoutes);

// app.use(async (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).send("Unauthorized");
//   }
//   try {
//     const decoded = await verify(
//       req.headers.authorization.split(" ")[1],
//       process.env.JWT_SECRET
//     );
//     if (decoded !== undefined) {
//       req.user = decoded;
//       return next();
//     }
//   } catch (error) {
//     console.log(err);
//   }
//   return res.status(403).send("Invalid Token");
// });
// APP USE IS A MIDDLEWARE FOR UNAUTHORIZED USER'S PAGE BELOW
app.get("/info", async (req, res) => {
  try {
    const allUsers = await pool.query(`SELECT table_name 
        FROM information_schema.tables 
    WHERE table_type = 'BASE TABLE' 
        AND table_schema NOT IN 
            ('pg_catalog', 'information_schema');`);
    res.json(allUsers.rows);
  } catch (err) {
    res.send(err);
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server Launched at: http://localhost:3000`);
});

// TODO: ADMIN, AUTHENTICATION
