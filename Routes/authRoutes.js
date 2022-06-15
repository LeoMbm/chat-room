const { Router } = require("express");
const authController = require("../Controllers/authControllers");

const router = Router();

router.get("/api/login", authController.login_get);
router.post("/api/login", authController.login_post);
router.get("/api/register", authController.signup_get);
router.post("/api/register", authController.signup_post);

module.exports = router;
