// Import database connection
const sql = require("./database.js");

exports.getReports = (studentId, sendFeedback) => {
  var sqlString = "SELECT * FROM Monthly_report WHERE IndexNumber = ?";
  sql.query(sqlString, [studentId], (err, result) => {
    if (err) {
      sendFeedback(err, null);
    } else {
      sendFeedback(null, { data: result });
    }
  });
};
