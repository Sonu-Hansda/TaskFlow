const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "_id name email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {getAllUsers};
