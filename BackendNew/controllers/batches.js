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
