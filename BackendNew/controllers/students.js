const students = require("../models/students");

exports.getStudents = (req, res) => {
  var isSelected = req.query.isSelected;
  var company = req.query.company;

  if (isSelected) {
    students.getSelectedStudents(isSelected, () => {});
    // Get selected or not selected students
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
