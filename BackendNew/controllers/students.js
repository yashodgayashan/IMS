const students = require("../models/students");

exports.getStudents = (req, res) => {
  var isSelected = req.query.isSelected;
  var company = req.query.company;

  if (isSelected) {
    res.send(students.getSelectedStudents(isSelected));
  } else if (company) {
    try {
      var student = students.getStudentsByCompany(company);
      res.send(student);
    } catch (err) {
      console.log("ERROR" + err);
    }
  } else {
    students.getStudents((err, result) => {
      if (err) {
        console.error("Error :" + err);
        res.status(404);
      } else {
        res.status(200);
        res.send(result.data);
      }
    });
  }
};
