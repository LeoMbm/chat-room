const { Router } = require("express");
const dataControllers = require("../Controllers/dataControllers");

const router = Router();

router.get("/api/users", dataControllers.allUsers_get);
router.get("/api/users/:id", dataControllers.userById_get);
router.delete("/api/users/:id", dataControllers.userById_delete);
// CREATE AND GET LOBBY
router.get("/api/lobby", dataControllers.allLobby_get);
router.post("/api/lobby", dataControllers.allLobby_post);
// ADD AND GET USER IN LOBBY
router.get("/api/lobby/users", dataControllers.userLobby_get);
router.post("/api/lobby/users", dataControllers.userLobby_post);

module.exports = router;
