const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/me", auth.authenticateUser, userController.getUser);

router.get("/", userController.getAllUsers);

router.put("/update/:id", auth.authenticateUser, userController.updateUser);

module.exports = router;
