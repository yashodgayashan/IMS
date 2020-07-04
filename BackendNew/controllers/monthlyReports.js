const reports = require("../models/monthlyReports");
const students = require("../models/students");

exports.getReports = (req, res) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  if (batch) {
    reports.getReportsByBatch(studentId, batch, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).send({ reports: result.data });
      }
    });
  } else {
    reports.getReports(studentId, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).send({ reports: result.data });
      }
    });
  }
};

exports.createReport = (req, res) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  var body = req.body;
  if (batch) {
    students.hasStudentABatch(studentId, batch, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal server error" });
      } else {
        if (result.data == 0) {
          res.status(400).send({ message: "Invalid batch" });
        } else {
          checkReport(req, (err, msg) => {
            if (err) {
              res.status(400).send({ message: msg });
            } else {
              const report = new reports.Report({
                BatchId: batch,
                IndexNumber: studentId,
                ReportNumber: body.reportNumber,
                Report: body.report
              });
              reports.createReport(report, (err, result) => {
                if (err) {
                  res.status(500).send({ message: "Internal Server Error" });
                } else {
                  res.status(201).send({
                    studentId: studentId,
                    batchId: batch,
                    reportId: body.reportNumber
                  });
                }
              });
            }
          });
        }
      }
    });
  } else {
    res.status(400).send({ message: "Please mention the batch" });
  }
};

const checkReport = (req, isCompleted) => {
  var error = true;
  if (!req.body) {
    isCompleted(error, "Body should not be empty");
  } else if (!req.body.reportNumber) {
    isCompleted(error, "Name should not be empty");
  } else if (!req.body.report) {
    isCompleted(error, "Report should not be empty");
  } else if (!req.body.date) {
    isCompleted(error, "SubmittedDate should not be empty");
  } else {
    reports.getReportByNumber(
      req.params.studentId,
      req.query.batch,
      req.body.reportNumber,
      (err, data) => {
        if (err) {
          isCompleted(error, "Something wrong with the server");
        } else {
          if (data == true) {
            isCompleted(error, "Report is already exsists");
          } else {
            isCompleted(null, null);
          }
        }
      }
    );
  }
};
