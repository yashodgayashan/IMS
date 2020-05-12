const sql = require("./db.js");

// constructor
const Student = function(student) {
  this.id=student.id;
  this.email = student.email;
  this.name = student.name;
  this.password = student.password;
};

module.exports = Student;