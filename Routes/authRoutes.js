const { Router } = require("express");
const authController = require("../Controllers/authControllers");
const { pool } = require("../db/dbConfig");
const router = Router();

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/logout", authController.logout_get);
router.get("/jwt", authController.requireAuth, (req, res) => {
  res.status(200).send(req.headers.cookie);
});
router.get("/info", authController.requireAuth, async (req, res) => {
  try {
    const allUsers = await pool.query(`SELECT table_name 
          FROM information_schema.tables 
      WHERE table_type = 'BASE TABLE' 
          AND table_schema NOT IN 
              ('pg_catalog', 'information_schema');`);
    res.json(allUsers.rows);
    return;
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// FIXME: APP.USE() TO REPLACE WITH REQUIREAUTH MIDDLEWARE
