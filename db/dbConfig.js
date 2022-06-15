const { Pool } = require("pg");

// DB Part

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDB,
});

// const query = `INSERT TABLE users_in_lobby(
//     id INT NOT NULL,
//     user_id INT,
//     lobby_id INT,
//     PRIMARY KEY (id)
//     );`;

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  pool,
};

// app.get('/profile', requiresAuth(), async (req, res) => {
//     const q = await pool.query('SELECT * from users WHERE email=$1', [req.oidc.user.email])

//     if(q.rowCount === 1)
//         return res.send(q.rows[0]);

//     return res.send('cet user nexiste pas')
//   });
