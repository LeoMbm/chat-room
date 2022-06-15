const { pool } = require("../db/dbConfig");

const bcrypt = require("bcrypt");

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { id, username, email, password } = req.body;

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const values = [id, username, email, hashedPwd];
    console.log(hashedPwd);
    console.log();
    const allUsers = await pool.query(
      `INSERT INTO users (id, username, email, password, created_at) VALUES ($1,$2,$3, $4, now())`,
      values
    );

    res.status(201).send("User Created");
  } catch (err) {
    res.status(401).send("Attempt Fail");
    console.log(err);
  }
};
module.exports.login_post = (req, res) => {
  res.send("connected");
};
