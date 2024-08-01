const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user");

const { users } = require("../data");

//registration route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //check if username and password are required
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Username and password are required!" });
  }

  // check if user already exist
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //store user
  const newUser = new User(username, hashedPassword);
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully!" });
});

//Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  //check if username and password are required
  if (!username || !password) {
    return res
      .status(401)
      .json({ message: "Username and password are required!" });
  }

  //find user
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //generate jwt if password is valid
  const token = jwt.sign({ username: user.username }, "secretkey", {
    expiresIn: "1h",
  });

  res.json({ token });
});

//Delete the user
// *later we might need to think what we can give from frontend to make a delete request*
router.delete("/delete", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex === -1) {
    return res.status(401).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);

  return res.status(200).json({ message: "User deleted successfully!" });
});

// List Users Route
router.get("/users", async (req, res) => {
  res.json(users);
});

module.exports = router;
