const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

function registerUser(req, res) {
  const user = req.body;
  User.createUser(user, (err, token) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ token });
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;
  User.loginUser(email, password, (err, token) => {
    if (err) {
      return res.status(401).json({ error: err.message });
    }
    res.json({ token });
  });
}

function getUser(req, res) {
  console.log(req.user)
  res.json(req.user);
}


function getAllUsers(req, res) {
  User.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(users);
  });
}

async function updateUser(req, res) {
  const { name, email, password } = req.body;
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "User not found" });
  }

  const userData = { name, email, password };
  User.updateUser(id, userData, (err, result) => {
    if (err) {
      return res.status(404).json({ error: err.message });
    }
    res.json({ message: "User updated successfully" });
  });
}


module.exports = {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
};
