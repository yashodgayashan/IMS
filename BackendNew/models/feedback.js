// Import database connection
const sql = require("./database.js");

exports.getFeedbacks = (studentId, sendFeedbacks) => {
  var sqlString =
    "SELECT FeedbackId, BatchId, IndexNumber FROM feedback WHERE IndexNumber = ?";
  sql.query(sqlString, [studentId], (err, result) => {
    if (err) {
      sendFeedbacks(err, null);
    } else {
      sendFeedbacks(null, { data: result });
    }
  });
};
