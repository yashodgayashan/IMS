// Import database connection
const sql = require("../models/database.js");

exports.getStudentsByBatch = (batch, callback) => {
  var sqlString =
    "( SELECT S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, NULL as IsSelected, NULL as CompanyId, NULL as CompanyName from student S, student_has_batch H, Batch B where s.IndexNumber = H.IndexNumber  AND H.BatchId = B.BatchId AND B.BatchId = ? AND s.IndexNumber NOT IN ( SELECT S.IndexNumber from student S, student_has_batch H, Batch B, student_select_company SC where s.IndexNumber = H.IndexNumber AND H.BatchId = B.BatchId AND SC.IndexNumber = S.IndexNumber AND SC.BatchId = B.BatchId AND B.BatchId = ? AND SC.IsSelected = 1 ) GROUP BY S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId ) UNION ( SELECT S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, Sc.IsSelected, C.CompanyId, C.Name as CompanyName from student S, student_has_batch H, Batch B, student_select_company SC, Company C where s.IndexNumber = H.IndexNumber AND H.BatchId = B.BatchId AND SC.IndexNumber = S.IndexNumber AND SC.BatchId = B.BatchId AND SC.IsSelected = 1 AND C.CompanyId = SC.CompanyId AND B.BatchId = ? GROUP BY S.IndexNumber, S.FullName, S.NameWithInitials, S.PhoneNumber, S.Email, S.Sem1GPA, S.Sem2GPA, S.Sem3GPA, S.Sem4GPA, S.SGPA, B.BatchId, SC.IsSelected, C.CompanyId, C.Name)";
  console.log("hi");
  sql.query(sqlString, [batch, batch, batch], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};

exports.createBasicStudent = (student, callback) => {
  var sqlString = "INSERT INTO student SET ?";
  sql.query(sqlString, student, (err, result) => {
    if (err) {
      console.log("error: ", err);
      callback(err, null);
    } else {
      console.log("created student: ", { id: result.insertId, ...student });
      callback(null, { data: result });
    }
  });
};

exports.getStudntByUserNamePassword = (studentId, password, callback) => {
  var sqlString =
    "SELECT IndexNumber as Id, RoleName as Role, FullName as Name FROM Student WHERE indexNumber = ? AND password = ?";
  sql.query(sqlString, [studentId, password], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};
