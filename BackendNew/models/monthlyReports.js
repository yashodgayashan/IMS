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

exports.Report = function(feedback) {
  this.BatchId = feedback.BatchId;
  this.IndexNumber = feedback.IndexNumber;
  this.ReportNumber = feedback.ReportNumber;
  this.Report = feedback.Report;
};

exports.createReport = (report, isCreated) => {
  var reportSql = "INSERT INTO monthly_report SET ?";
  sql.query(reportSql, report, (err, result) => {
    if (err) {
      console.log("error: ", err);
      isCreated(err, null);
    } else {
      console.log("created feddback: ", { id: result.insertId, ...report });
      isCreated(null, result);
    }
  });
};

exports.getReportByNumber = (studentId, batchId, reportNumber, sendReports) => {
  var sqlString =
    "SELECT * FROM Monthly_report WHERE IndexNumber = ? AND BatchId = ? AND ReportNumber = ?";
  sql.query(sqlString, [studentId, batchId, reportNumber], (err, result) => {
    if (err) {
      sendReports(err, null);
    } else {
      if (result.length > 0) {
        sendReports(null, true);
      } else {
        sendReports(null, false);
      }
    }
  });
};
