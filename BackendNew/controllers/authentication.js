const students = require("../models/students");
const companies = require("../models/company");
const admins = require("../models/admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Configure dotenv for read environment variables.
dotenv.config();

//authenticate user.
exports.authenticate = (req, res) => {
  // Check the body is valid.
  if (req.body.userName == undefined) {
    console.error("userName is not defined");
    res.status(406).send("Not acceptable");
  } else if (req.body.password == undefined) {
    console.error("password is not defined");
    res.status(406).send("Not acceptable");
  } else {
    // Store the body parameters.
    var userName = req.body.userName;
    // To-do hash the password.
    var password = req.body.password;

    // Check in student table.
    students.getStudntByUserNamePassword(userName, password, (err, result) => {
      if (err) {
        console.error("Error :" + err);
        res.status(404);
      } else {
        if (result.data.length == 0) {
          // If not found in staudent table check in company table.
          companies.getCompanyByUserNamePassword(
            userName,
            password,
            (err, result) => {
              if (err) {
                console.error("Error :" + err);
                res.status(404);
              } else {
                if (result.data.length == 0) {
                  // If not found in company table check in admin table.
                  admins.getAdminByUserNamePassword(
                    userName,
                    password,
                    (err, result) => {
                      if (err) {
                        console.error("Error :" + err);
                        res.status(404);
                      } else {
                        if (result.data.length == 0) {
                          res.status(401).send("Authentication failed");
                        } else {
                          res
                            .status(200)
                            .send(generateJwtToken(result.data[0]));
                        }
                      }
                    }
                  );
                } else {
                  res.status(200).send(generateJwtToken(result.data[0]));
                }
              }
            }
          );
        } else {
          res.status(200).send(generateJwtToken(result.data[0]));
        }
      }
    });
  }
};

generateJwtToken = user => {
  const payload = { Name: user.Name, Id: user.Id, Role: user.Role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  return { accessToken: accessToken, refreshToken: refreshToken };
};

generateAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h"
  });
};
