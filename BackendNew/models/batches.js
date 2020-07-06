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

exports.Batch = function(batch) {
  this.BatchId = batch.BatchId;
  this.CreatedBy = batch.CreatedBy;
  this.Year = batch.Year;
  this.StartDate = batch.StartDate;
  this.EndDate = batch.EndDate;
  this.CompanyCount = batch.CompanyCount;
};
