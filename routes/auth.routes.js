const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// router.get("/logout", authController.postLogout);
router.post("/login", authController.postLogin);
router.post("/register", authController.postRegister);
router.get("/users", authController.getUsers);

module.exports = router;
