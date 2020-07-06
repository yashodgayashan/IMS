// Import database connection
const sql = require("./database.js");

exports.getBatches = getBatches => {
  var sqlString = "SELECT * FROM Batch ";
  sql.query(sqlString, (err, result) => {
    if (err) {
      getBatches(err, null);
    } else {
      getBatches(null, result);
    }
  });
};
