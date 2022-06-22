const { pool } = require("../db/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = async (req, res) => {
  await res.render("signup");
};
module.exports.login_get = async (req, res) => {
  await res.render("login");
};

module.exports.signup_post = async (req, res) => {
  const { id, username, email, password } = req.body;
  if (!username && !email && !password)
    return res.status(400).send({ error: "Invalid Request" });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const values = [username, email, hashedPwd];
    // console.log(hashedPwd);

    const user = await pool.query(
      `INSERT INTO users (username, email, password, created_at) VALUES ($1,$2,$3, now());`,
      values
    );

    res.status(201).send("User Created");
  } catch (err) {
    res.status(401).send("Attempt Fail");
    console.log(err);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ error: "Invalid Request" });

  try {
    const user = await pool.query(`SELECT * FROM users WHERE email=$1;`, [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(404).send("User not found");
    }

    const hash = user.rows[0].password;

    const match = await bcrypt.compare(password, hash);
    // console.log("email:" + email);
    // console.log("password:" + password + " match:" + match);
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    // console.log(token);

    if (match === true) {
      res.send("Connected");
    } else return res.status(401).send("Wrong password");

    // console.log(match);
  } catch (error) {
    console.log(error);
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        console.log("You have the token !");
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
