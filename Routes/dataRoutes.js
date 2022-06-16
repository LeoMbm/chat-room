const { Router } = require("express");
const dataControllers = require("../Controllers/dataControllers");

const router = Router();

router.get("/api/users", dataControllers.allUsers_get);
router.get("/api/users/:id", dataControllers.userById_get);
router.delete("/api/users/:id", dataControllers.userById_delete);
// CREATE AND GET LOBBY
router.get("/api/lobby", dataControllers.allLobby_get);
router.get("/api/lobby/:id", dataControllers.IDLobby_get);
router.post("/api/lobby", dataControllers.allLobby_post);
router.delete("/api/lobby/:id", dataControllers.allLobby_delete);
// ADD GET AND DELETE USER IN LOBBY
router.get("/api/usersinlobby", dataControllers.userLobby_get);
router.post("/api/usersinlobby", dataControllers.userLobby_post);
router.delete("/api/usersinlobby/:id", dataControllers.userLobby_delete);
// CREATE GET AND DELETE MESSAGE
router.get("/api/messages", dataControllers.messages_get);
router.get("/api/messages/:id", dataControllers.messageID_get);
router.post("/api/messages", dataControllers.messages_post);
router.delete("/api/messages/:id", dataControllers.messages_delete);
// FIXME: WHY /api/lobby/messages doesnt work ?
//TODO: JWT

module.exports = router;
