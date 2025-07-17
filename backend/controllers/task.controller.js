const Task = require("../models/task");
const User = require("../models/user");

const getTasks = async (req, res) => {
  try {
    const userId = req.user;

    const tasks = await Task.find({
      $or: [{ assignee: { id: userId } }, { createdBy: userId }],
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching user tasks:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignee } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let assigneeData = {};
    if (assignee) {
      const member = await User.findById(assignee);
      if (member) {
        assigneeData = {
          id: member._id,
          name: member.name,
        };
      }
    }

    const task = await Task.create({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      assignee: Object.keys(assigneeData).length > 0 ? assigneeData : undefined,
      createdBy: userId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, assignee, status } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate ? new Date(dueDate) : task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    if (assignee) {
      const member = await User.findById(assignee);
      if (member) {
        task.assignee = {
          id: member._id,
          name: member.name,
        };
      }
    }

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createTask, getTasks, updateTask };
