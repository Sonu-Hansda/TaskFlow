const express = require("express");
const { getAllUsers } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/getAll").get(authMiddleware, getAllUsers);

module.exports = router;
