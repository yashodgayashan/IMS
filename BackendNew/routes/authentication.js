const express = require("express");
const router = express.Router();
const authentication = require("../controllers/authentication");

router.post("/", authentication.authenticate);

module.exports = router;
