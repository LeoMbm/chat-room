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
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const key = crypto.randomBytes(64).toString("hex");
// console.log(key);

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

app.listen(process.env.PORT || 3000, function () {
  console.log(`Server Launched at: http://localhost:3000`);
});

// TODO: ADMIN, AUTHENTICATION
