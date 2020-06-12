const reports = require("../models/monthlyReports");

exports.getReports = (req, res) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  reports.getReports(studentId, (err, result) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    } else {
      res.status(200).send({ reports: result.data });
    }
  });
};
