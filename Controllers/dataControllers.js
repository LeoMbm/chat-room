const { pool, query } = require("../db/dbConfig");

// TODO: DATABASE NEW USERS

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
    if (allUsers.rowCount === 0)
      return res.status(400).send("User doesnt exist");
    res.status(201).send("User deleted");
  } catch (err) {
    res.status(500).send("Fail for delete");
    console.log(err);
  }
};

module.exports.allLobby_get = async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM lobby");
    res.json(allUsers.rows);
  } catch (err) {
    res.send(err);
  }
};

module.exports.IDLobby_get = async (req, res) => {
  try {
    const allUsers = await pool.query(
      `SELECT * FROM lobby WHERE id=${req.params.id}`
    );
    res.json(allUsers.rows);
  } catch (err) {
    res.send(err);
  }
};
module.exports.allLobby_post = async (req, res) => {
  const { id, name, admin_id } = req.body;

  try {
    const values = [id, name, admin_id];
    const allLobby = await pool.query(
      `INSERT INTO lobby (id, name, created_at, admin_id) VALUES ($1,$2,now(),$3)`,
      values
    );

    res.status(201).send("Lobby Created");
  } catch (err) {
    res.status(401).send("Attempt Fail");
    console.log(err);
  }
};

module.exports.allLobby_delete = async (req, res) => {
  try {
    const allUsers = await pool.query(
      `DELETE FROM lobby WHERE id=${req.params.id}`
    );
    res.status(201).send("Lobby deleted");
  } catch (err) {
    res.status(500).send("Fail for delete");
    console.log(err);
  }
};

module.exports.userLobby_get = async (req, res) => {
  try {
    const allUsers = await pool.query(`SELECT * FROM users_in_lobby`);
    res.json(allUsers.rows);
  } catch (err) {
    res.send(err);
  }
};

module.exports.userLobby_post = async (req, res) => {
  const { username, lobby_id } = req.body;
  if (!username) return res.status(400).send({ error: "Invalid Request" });

  try {
    const user = await pool.query(`SELECT * FROM users WHERE username=$1`, [
      username,
    ]);
    if (user.rowCount === 0) {
      console.log("No user found");
    } else {
      await pool.query(
        `INSERT INTO users_in_lobby (lobby_id, user_id) VALUES ($1, $2)`,
        [lobby_id, user.rows[0].id]
      );
    }
    res.status(201).send("User Added in Lobby");
  } catch (err) {
    res.status(500).send("Attempt Fail");
    console.log(err);
  }
};

module.exports.userLobby_delete = async (req, res) => {
  try {
    const allUsers = await pool.query(
      `DELETE FROM users_in_lobby WHERE user_id=${req.params.id}`
    );
    if (allUsers.rowCount === 0) {
      console.log("User not in the group");
    } else return res.status(201).send("User deleted from the lobby");
  } catch (err) {
    res.status(500).send("Fail for delete");
    console.log(err);
  }
};

module.exports.messages_get = async (req, res) => {
  try {
    const messages = await pool.query(`SELECT * FROM messages`);
    res.json(messages.rows);
  } catch (err) {
    res.send(err);
  }
};

module.exports.messageID_get = async (req, res) => {
  try {
    const messages = await pool.query(
      `SELECT * FROM messages where id =${req.params.id}`
    );
    res.json(messages.rows);
  } catch (err) {
    res.send(err);
  }
};

module.exports.messages_post = async (req, res) => {
  const { content, username, lobby_id } = req.body;
  if (!username) return res.status(400).send({ error: "Invalid Request" });

  try {
    const user = await pool.query(`SELECT * FROM users WHERE username=$1`, [
      username,
    ]);
    if (user.rowCount === 0) {
      console.log("No user found");
    } else {
      await pool.query(
        `INSERT INTO messages (content, created_at, modified_at, author_id, lobby_id) VALUES ($1,now(), now(), $2, $3)`,
        [content, user.rows[0].id, lobby_id]
      );
    }
    res.status(201).send("Message sent");
  } catch (err) {
    res.status(500).send("Attempt Fail");
    console.log(err);
  }
};

module.exports.messages_delete = async (req, res) => {
  try {
    const allUsers = await pool.query(
      `DELETE FROM messages WHERE id=${req.params.id}`
    );
    res.status(201).send("Message deleted");
  } catch (err) {
    res.status(500).send("Fail for delete");
    console.log(err);
  }
};
