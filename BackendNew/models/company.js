// Import database connection
const sql = require("../models/database.js");

exports.hasCompany = (companyName, callback) => {
  var sqlString = "SELECT COUNT(Name) as Count FROM Company WHERE Name=?";
  sql.query(sqlString, [companyName], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      if (result[0].Count == 1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  });
};
