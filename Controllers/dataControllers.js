const { pool, query } = require("../db/dbConfig");

module.exports.allUsers_get = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    res.send(err);
  }
};

module.exports.userById_get = async (req, res) => {
  try {
    const allUsers = await pool.query(
      `SELECT * FROM users WHERE id=${req.params.id}`
    );
    res.json(allUsers.rows);
  } catch (err) {
    res.send(err);
  }
};

module.exports.userById_delete = async (req, res) => {
  try {
    const allUsers = await pool.query(
      `DELETE FROM users WHERE id=${req.params.id}`
    );
    res.status(201).send("User deleted");
  } catch (err) {
    res.status(500).send("Fail for delete");
    console.log(err);
  }
};
