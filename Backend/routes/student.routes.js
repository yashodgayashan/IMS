const express = require('express');
const router = express.Router();
const students = require("../controllers/student.controller.js");
const login = require("../controllers/login.controller.js");
const jwtLogin = require("jwt-login");
var valid_login = login.valid_login;

// Create a new student
router.post("/students", valid_login, function(req, res){
    var user = req.jwt.user//this the user 
    var role = model.getroles(user);
  
    var value = roles.getRoleRoutePrivilegeValue(role, "/students", "POST");
    if(value){
        students.create
    }else{
        res.send500(req, res, "not allowed");
    }
    
});

// Retrieve all student
router.get("/students", students.findAll);

// Retrieve a single student with studentId
router.get("/students/:studentId", students.findOne);

// Update a student with studentId
router.put("/students/:studentId", students.update);

// Delete a student with studentId
router.delete("/students/:studentId", students.delete);

// delete all students
router.delete("/students", students.deleteAll);

module.exports = router;