const { pool } = require("../db/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userLobby_post } = require("./dataControllers");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
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

    if (match === true) {
      res.send("You have the password");
    } else return res.status(401).send("You dont have the password");

    // console.log(match);
  } catch (error) {
    console.log(error);
  }
};

// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   const token = bearerHeader && bearerHeader.split(" ")[1];
//   if (token == null) return res.status(401);
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403);
//     req.user = user;
//     next();
//   });
// }

// const idToken = req.headers.authorization;

// jwt.verify(idToken, process.env.JWT_SECRET, (err, decoded) => {
//   if (err) {
//     res.status(401).send("Unauthorized");
//   } else {
//     res.send(user.rows);
//   }
// });
// console.log(idToken);
