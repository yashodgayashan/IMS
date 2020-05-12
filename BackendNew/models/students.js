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
  var notSelectedStudentsSql =
    "SELECT S.NameWithInitials as Name, S.Batch as RegNo, B.Name as InternBatch, SC.StudentId FROM Student S, Batch B, Student_Select_Company SC, Company C" +
    "WHERE S.BatchId = B.BatchId AND S.StudentId = SC.StudentId AND C.CompanyId = SC.CompanyId AND SC.IsSelected = 0 AND S.NameWithInitials NOT IN (" +
    " SELECT S.NameWithInitials FROM Student S, Batch B, Student_Select_Company SC, Company C WHERE S.BatchId = B.BatchId AND S.StudentId = SC.StudentId" +
    "AND C.CompanyId = SC.CompanyId AND SC.IsSelected = 1) GROUP BY S.NameWithInitials, S.Batch, B.Name, SC.StudentId";
  var selectedStudentsSql =
    "SELECT S.NameWithInitials as Name, S.Batch as RegNo, B.Name as InternBatch, SC.StudentId FROM Student S, Batch B, Student_Select_Company SC," +
    "Company C WHERE S.BatchId = B.BatchId AND S.StudentId = SC.StudentId AND C.CompanyId = SC.CompanyId AND SC.IsSelected = 1";
  // Get selected or not selected students
};

exports.getStudentsByCompany = company => {
  // Get Selected students by compan
};
