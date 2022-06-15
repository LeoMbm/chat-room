const { Router } = require("express");
const authController = require("../Controllers/authControllers");

const router = Router();

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/signup", authController.signup_get);
router.post("/register", authController.signup_post);

module.exports = router;
