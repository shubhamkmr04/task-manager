const express = require("express");

const Task = require("../models/task");

const { users, tasks } = require("../data");

const router = express.Router();

// Create a new task
router.post("/create", (req, res) => {
  const { username, title, description, dueDate, priority, link, image } =
    req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newTask = new Task(title, description, dueDate, priority, link, image);

  tasks.push({ ...newTask, username });
  user.tasks.push(newTask);

  res
    .status(201)
    .json({ message: "Task created successfully!", task: newTask });
});

// Get all tasks for a user
router.get("", (req, res) => {
  const { username } = req.body;

  //we can search in users as well and retrieve tasks property
  const userTasks = tasks.filter((task) => task.username === username);
  if (userTasks.length === 0) {
    return res.status(404).json({ message: "No tasks found for this user" });
  }

  res.json(userTasks);
});

module.exports = router;
