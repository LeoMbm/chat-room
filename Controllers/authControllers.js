const { pool } = require("../db/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "ninja secret", {
    expiresIn: maxAge,
  });
};

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
    const user = await pool.query(
      `INSERT INTO users (id, username, email, password, created_at) VALUES ($1,$2,$3, $4, now())`,
      values
    );
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(token);
    res.status(201).send("User Created");
  } catch (err) {
    res.status(401).send("Attempt Fail");
    console.log(err);
  }
};
module.exports.login_post = (req, res) => {
  res.send("connected");
};
