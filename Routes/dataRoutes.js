const { Router } = require("express");
const dataControllers = require("../Controllers/dataControllers");

const router = Router();

router.get("/api/users", dataControllers.allUsers_get);
router.get("/api/users/:id", dataControllers.userById_get);
router.delete("/api/users/:id", dataControllers.userById_delete);

module.exports = router;
