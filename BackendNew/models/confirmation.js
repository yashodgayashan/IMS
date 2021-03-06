// Import database connection
const sql = require("./database.js");

exports.getConfirmation = (studentId, batchId, sendConfirmation) => {
  var sqlString =
    "SELECT * FROM student_select_company WHERE IndexNumber = ? AND BatchId = ? AND IsSelected = 1";
  sql.query(sqlString, [studentId, batchId], (err, result) => {
    if (err) {
      sendConfirmation(err, null);
    } else {
      sendConfirmation(null, { data: result[0] });
    }
  });
};

exports.createConfirmation = (
  studentId,
  batchId,
  companyId,
  updateConfirmation
) => {
  var sqlString =
    "UPDATE student_select_company SET IsSelected = 1 WHERE IndexNumber = ? AND BatchId = ? AND CompanyId = ?";
  sql.query(sqlString, [studentId, batchId, companyId], (err, result) => {
    if (err) {
      updateConfirmation(err, null);
    } else {
      updateConfirmation(null, { data: result });
    }
  });
};

exports.removeConfirmation = (
  studentId,
  batchId,
  companyId,
  updateConfirmation
) => {
  var sqlString =
    "UPDATE student_select_company SET IsSelected = 0 WHERE IndexNumber = ? AND BatchId = ? AND CompanyId = ?";
  sql.query(sqlString, [studentId, batchId, companyId], (err, result) => {
    if (err) {
      updateConfirmation(err, null);
    } else {
      updateConfirmation(null, { data: result });
    }
  });
};

exports.hasConfirmed = (studentId, batchId, isConfirmed) => {
  var sqlString =
    "SELECT Count(*) AS Count FROM student_select_company WHERE IndexNumber = ? AND BatchId = ? AND IsSelected = 1";
  sql.query(sqlString, [studentId, batchId], (err, result) => {
    if (err) {
      isConfirmed(err, null);
    } else {
      isConfirmed(null, { data: result[0].Count });
    }
  });
};

exports.hasConfirmedCompany = (studentId, batchId, company, isConfirmed) => {
  var sqlString =
    "SELECT Count(*) AS Count FROM student_select_company WHERE IndexNumber = ? AND BatchId = ? AND IsSelected = 1 AND CompanyId = ?";
  sql.query(sqlString, [studentId, batchId, company], (err, result) => {
    if (err) {
      isConfirmed(err, null);
    } else {
      isConfirmed(null, { data: result[0].Count });
    }
  });
};
