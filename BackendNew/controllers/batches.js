const batches = require("../models/batches");

exports.getBatches = (req, res) => {
  batches.getBatches((err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).send({ data: result });
    }
  });
};

exports.createBatch = (req, res) => {
  if (req.user.Role == "Admin") {
    checkBatch(req, (err, msg) => {
      if (err) {
        res.status(400).send({ message: msg });
      } else {
        const batch = new batches.Batch({
          BatchId: req.body.batchId,
          CreatedBy: req.user.Id,
          Year: req.body.year,
          StartDate: req.body.startDate,
          EndDate: req.body.endDate,
          CompanyCount: req.body.allowedCompanyCount
        });
        batches.createBatch(batch, (err, result) => {
          if (err) {
            res.status(500).send({ message: "Internal Server Error" });
          } else {
            res.status(201).send({
              batchId: batch.BatchId
            });
          }
        });
      }
    });
  } else {
    res.status(403).send("Unauthorized");
  }
};

const checkBatch = (req, isCompleted) => {
  var error = true;
  if (!req.body) {
    isCompleted(error, "Body should not be empty");
  } else if (!req.body.batchId) {
    isCompleted(error, "BatchId should not be empty");
  } else if (!req.body.allowedCompanyCount) {
    isCompleted(error, "Allowed comany count should not be empty");
  } else {
    batches.hasBatch(req.body.batchId, (err, data) => {
      if (err) {
        isCompleted(error, "Something wrong with the server");
      } else {
        if (data == true) {
          isCompleted(error, "Report is already exsists");
        } else {
          isCompleted(null, null);
        }
      }
    });
  }
};

exports.getBatch = (req, res) => {
  var batch = req.params.batchId;
  console.log(batch);
  if (batch) {
    batches.getBatch(batch, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result.length == 0) {
          res.status(400).send({ message: "Not found" });
        } else {
          res.status(200).send({ data: result[0] });
        }
      }
    });
  } else {
    res.status(400).send({ message: "Please mention the batch" });
  }
};
