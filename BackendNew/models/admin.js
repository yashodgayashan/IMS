// Import database connection
const sql = require("../models/database.js");

exports.getAdminByUserNamePassword = (adminId, password, callback) => {
  var sqlString =
    "SELECT AdminId as Id, 'Admin' as Role, Name FROM Admin WHERE AdminId = ? AND password = ?";
  sql.query(sqlString, [adminId, password], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { data: result });
    }
  });
};
