const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

// Authentication middleware
function authenticateUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "missing authentication token" });
  }
  const [, token] = req.headers.authorization.split(" ");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    User.getUserById(decoded.id, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      user.id=decoded.id
      req.user = user;
      next();
    });
  });
}

module.exports = {
  authenticateUser,
};
