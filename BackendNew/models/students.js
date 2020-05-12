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

exports.getSelectedStudents = (val, callback) => {
  // Sql query for not selected students.
  var notSelectedStudentsSql =
    "SELECT S.NameWithInitials as Name, S.Batch as RegNo, B.Name as InternBatch, SC.StudentId FROM Student S, Batch B, Student_Select_Company SC, Company C" +
    "WHERE S.BatchId = B.BatchId AND S.StudentId = SC.StudentId AND C.CompanyId = SC.CompanyId AND SC.IsSelected = 0 AND S.NameWithInitials NOT IN (" +
    " SELECT S.NameWithInitials FROM Student S, Batch B, Student_Select_Company SC, Company C WHERE S.BatchId = B.BatchId AND S.StudentId = SC.StudentId" +
    "AND C.CompanyId = SC.CompanyId AND SC.IsSelected = 1) GROUP BY S.NameWithInitials, S.Batch, B.Name, SC.StudentId";
  // Sql query for selected students.
  var selectedStudentsSql =
    "SELECT S.NameWithInitials as Name, S.Batch as RegNo, B.Name as InternBatch, SC.StudentId FROM Student S, Batch B, Student_Select_Company SC," +
    "Company C WHERE S.BatchId = B.BatchId AND S.StudentId = SC.StudentId AND C.CompanyId = SC.CompanyId AND SC.IsSelected = 1";
  var sqlString;
  if (val == "true") {
    sqlString = selectedStudentsSql;
  } else if (val == "false") {
    sqlString = notSelectedStudentsSql;
  } else {
    // If query parameter is invalid
    callback({ err: new Error("Invalid Input") });
  }
  sql.query(sqlString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};

exports.getStudentsByCompany = company => {
  // Get Selected students by compan
};
