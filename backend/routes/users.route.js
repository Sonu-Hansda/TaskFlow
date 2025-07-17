const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.route("/getAll").get(authMiddleware, userController.getAllUsers);
router
  .route("/profile")
  .get(authMiddleware, userController.getUserProfile)
  .put(authMiddleware, userController.updateUserProfile);

module.exports = router;
