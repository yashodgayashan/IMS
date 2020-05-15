const students = require("../models/students");
const companies = require("../models/company");

exports.getStudents = (req, res) => {
  var isSelected = req.query.isSelected;
  var company = req.query.company;

  if (isSelected) {
    // Get selected or not selected students
    students.getSelectedStudents(isSelected, (err, result) => {
      if (err) {
        console.error("Error :" + err.message);
        res.status(404);
      } else {
        console.log("Get Student control function");
        res.status(200);
        res.send(result.data);
      }
    });
  } else if (company) {
    // Get students by companywise
    companies.hasCompany(company, (err, result) => {
      if (err) {
        console.error("Error :" + err.message);
        res.status(404);
      } else if (result) {
        students.getStudentsByCompany(company, (err, result) => {
          if (err) {
            console.error("Error :" + err.message);
            res.status(404);
          } else {
            console.log("Get Student control function");
            res.status(200);
            res.send(result.data);
          }
        });
      } else {
        console.error("Error : Not found a company");
        res.status(404);
      }
    });
  } else {
    students.getStudents((err, result) => {
      if (err) {
        console.error("Error :" + err);
        res.status(404);
      } else {
        console.log("Get Student control function");
        res.status(200);
        res.send(result.data);
      }
    });
  }
};

exports.getStudent = (req, res) => {
  var studentId = req.params.studentId;

  students.getStudent(studentId, (err, result) => {
    if (err) {
      console.error("Error :" + err);
      res.status(404);
    } else {
      console.log("Get Student control function");
      res.status(200);
      res.send(result.data);
    }
  });
};
