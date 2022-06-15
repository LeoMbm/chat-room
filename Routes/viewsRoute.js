const { Router } = require("express");
const viewsController = require("../Controllers/viewsController");

const router = Router();

router.get("/", viewsController.index_get);
router.get("/about", viewsController.about_get);

module.exports = router;