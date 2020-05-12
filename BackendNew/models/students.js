// Import database connection
const sql = require("../models/database.js");

exports.getStudents = callback => {
  var sqlString =
    "SELECT S.NameWithInitials as Name, S.Batch as RegNo, B.Name as InternBatch FROM Student S, Batch B WHERE S.BatchId = B.BatchId";
  sql.query(sqlString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};

exports.getSelectedStudents = val => {
  // Get selected or not selected students
};

exports.getStudentsByCompany = company => {
  // Get Selected students by compan
};
