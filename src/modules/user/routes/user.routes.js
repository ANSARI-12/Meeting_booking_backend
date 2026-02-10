const router = require("express").Router();
const controller = require("../interface/user.controller");

router.post("/", controller.create);
router.get("/:id", controller.get);

module.exports = router;
