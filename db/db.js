app.get('/profile', requiresAuth(), async (req, res) => {
    const q = await pool.query('SELECT * from users WHERE email=$1', [req.oidc.user.email])

    if(q.rowCount === 1)
        return res.send(q.rows[0]);

    return res.send('cet user nexiste pas')
  });