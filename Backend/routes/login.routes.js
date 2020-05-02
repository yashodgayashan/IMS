const express = require('express');
const router = express.Router();
const login = require("../controllers/login.controller.js");

// Retrieve a single student with studentId
router.post("/user", login.findUser);
router.post("/logout", login.logOut);

module.exports = router;