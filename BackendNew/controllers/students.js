const students = require("../models/students");

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
