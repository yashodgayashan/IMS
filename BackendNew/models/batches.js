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

exports.createBatch = (batch, isCreated) => {
  var batchSql = "INSERT INTO batch SET ?";
  sql.query(batchSql, batch, (err, result) => {
    if (err) {
      console.log("error: ", err);
      isCreated(err, null);
    } else {
      console.log("created feddback: ", { id: result.insertId, ...batch });
      isCreated(null, result);
    }
  });
};

exports.hasBatch = (batchId, hasBatch) => {
  var sqlString = "SELECT * FROM Batch WHERE BatchId = ? ";
  sql.query(sqlString, [batchId], (err, result) => {
    if (err) {
      hasBatch(err, null);
    } else {
      if (result.length > 0) {
        hasBatch(null, true);
      } else {
        hasBatch(null, false);
      }
    }
  });
};

exports.getBatch = (batchId, sendBatch) => {
  var sqlString = "SELECT * FROM Batch WHERE BatchId = ? ";
  sql.query(sqlString, [batchId], (err, result) => {
    if (err) {
      sendBatch(err, null);
    } else {
      sendBatch(err, result);
    }
  });
};
