const confirmation = require("../models/confirmation");

exports.getConfirmation = (req, res) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  if (batch) {
    confirmation.getConfirmation(studentId, batch, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).send({ feedback: result.data });
      }
    });
  } else {
    res.status(400).send({ message: "Please send the batchId" });
  }
};
