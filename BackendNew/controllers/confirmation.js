const confirmation = require("../models/confirmation");
const student = require("../models/students");

exports.getConfirmation = (req, res) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  if (batch) {
    confirmation.getConfirmation(studentId, batch, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        res.status(200).send({ confirmation: result.data });
      }
    });
  } else {
    res.status(400).send({ message: "Please send the batchId" });
  }
};

exports.createConfirmation = (req, res) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  var company = req.query.company;
  if (batch && company) {
    confirmation.hasConfirmed(studentId, batch, (err, result) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        if (result.data == 1) {
          res
            .status(400)
            .send({ message: "Already confirmed. Please remove confirmation" });
        } else {
          student.hasStudentABatch(studentId, batch, (err, hasBatch) => {
            if (err) {
              res.status(500).send({ message: "Internal Server Error" });
            } else {
              if (hasBatch.data == 0) {
                res
                  .status(400)
                  .send({ message: "Student don't register for such batch" });
              } else {
                confirmation.createConfirmation(
                  studentId,
                  batch,
                  company,
                  (err, result) => {
                    if (err) {
                      res
                        .status(500)
                        .send({ message: "Internal Server Error" });
                    } else {
                      res.status(200).send({ confirmation: "Confirmed" });
                    }
                  }
                );
              }
            }
          });
        }
      }
    });
  } else if (!batch) {
    res.status(400).send({ message: "Please send the batchId" });
  } else {
    res.status(400).send({ message: "Please send the companyId" });
  }
};

exports.removeConfirmation = (req, res) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  var company = req.query.company;
  if (batch && company) {
    student.hasStudentABatch(studentId, batch, (err, hasBatch) => {
      if (err) {
        res.status(500).send({ message: "Internal Server Error" });
      } else {
        console.log(hasBatch.data);
        if (hasBatch.data == 0) {
          res
            .status(400)
            .send({ message: "Student don't register for such batch" });
        } else {
          confirmation.hasConfirmedCompany(
            studentId,
            batch,
            company,
            (err, result) => {
              if (err) {
                res.status(500).send({ message: "Internal Server Error" });
              } else {
                if (result.data == 1) {
                  confirmation.removeConfirmation(
                    studentId,
                    batch,
                    company,
                    (err, result) => {
                      if (err) {
                        res
                          .status(500)
                          .send({ message: "Internal Server Error" });
                      } else {
                        res
                          .status(200)
                          .send({ confirmation: "Removed confirmation" });
                      }
                    }
                  );
                } else {
                  res.status(400).send({
                    message:
                      "Student is not confirmed for the company or student is not yet confirmed"
                  });
                }
              }
            }
          );
        }
      }
    });
  } else if (!batch) {
    res.status(400).send({ message: "Please send the batchId" });
  } else {
    res.status(400).send({ message: "Please send the companyId" });
  }
};
