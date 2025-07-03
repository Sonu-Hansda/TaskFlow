const express = require("express");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/get-all").get(authMiddleware, taskController.getTasks);
router.route("/add-new").post(authMiddleware, taskController.createTask);

module.exports = router;
