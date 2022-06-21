const { Router } = require("express");
const viewsController = require("../Controllers/viewsController");
const authController = require("../Controllers/authControllers");
const { requireAuth } = require("../Controllers/authControllers");

const router = Router();

router.get("/", viewsController.index_get);
router.get("/about", viewsController.about_get);
router.get("/welcome", viewsController.newUser_get);
router.get("/home", authController.requireAuth, viewsController.loginUser_get);

module.exports = router;
