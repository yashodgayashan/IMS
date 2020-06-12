// Import database connection
const sql = require("./database.js");

exports.getReports = (studentId, sendReports) => {
  var sqlString = "SELECT * FROM Monthly_report WHERE IndexNumber = ?";
  sql.query(sqlString, [studentId], (err, result) => {
    if (err) {
      sendReports(err, null);
    } else {
      sendReports(null, { data: result });
    }
  });
};

exports.getReportsByBatch = (studentId, batchId, sendReports) => {
  var sqlString =
    "SELECT * FROM Monthly_report WHERE IndexNumber = ? AND BatchId = ?";
  sql.query(sqlString, [studentId, batchId], (err, result) => {
    if (err) {
      sendReports(err, null);
    } else {
      sendReports(null, { data: result });
    }
  });
};
