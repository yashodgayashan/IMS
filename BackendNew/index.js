// Import libraries.
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql");
const debug = require("debug")("http");
const jwt = require("jsonwebtoken");

// Import Routes
const studentRoutes = require("./routes/students.js");
const authenticationRoutes = require("./routes/authentication.js");

// Import database connection
const connection = require("./models/database.js");

// Configure dotenv for read environment variables.
dotenv.config();

// Set variables.
const port = process.env.PORT || 8080;

// Init the express application.
const app = express();

// Setup middlewares.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Database connectivity
handleDB = () => {
  connection.connect(function(err) {
    if (err) {
      console.log("Database error : " + err);
      setTimeout(handleDB(), 2000);
    }
    console.log("Connected!!");
  });
};

handleDB();

// Set the app to listen on the port.
app.listen(port, () => {
  debug(`Start server at port : ${port}`);
  console.log(`Server running on port: ${port}`);
});

// Authenticate teh Token
authenticateUser = (req, res, next) => {
  const autheHeader = req.headers["authorization"];
  const token = autheHeader && autheHeader.split(" ")[1];
  if (token == null) return res.status(401).send();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send();
    }

    req.user = user;
    next();
  });
};

// Routing
app.use("/students", authenticateUser, studentRoutes);
app.use("/login", authenticationRoutes);
