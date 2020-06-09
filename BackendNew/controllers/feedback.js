const feedback = require("../models/feedback");

exports.getmultipleFeedback = (req, res) => {
  var batch = req.query.batch;
  var studentIndex = req.params.studentId;
  if (batch) {
    feedback.getMultipleFeedbackByBatch(studentIndex, batch, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server error" });
      } else {
        res.status(200).send({ feedback: result.data });
      }
    });
  } else {
    feedback.getMultipleFeedback(studentIndex, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server error" });
      } else {
        res.status(200).send({ feedback: result.data });
      }
    });
  }
};
