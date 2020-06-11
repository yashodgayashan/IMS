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
