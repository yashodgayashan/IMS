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
