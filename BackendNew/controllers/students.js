const students = require("../models/students");
const companies = require("../models/company");

// Get all students.
exports.getStudents = (req, res) => {
  var isSelected = req.query.isSelected;
  var company = req.query.company;
  var batch = req.query.batch;

  if (batch && isSelected) {
    students.getSelectedStudentsByBatch(isSelected, batch, (err, result) => {
      if (err) {
        console.error("Error :" + err.message);
        res.status(404).send();
      } else {
        console.log("Get Student control function");
        res.status(200);
        res.send(result.data);
      }
    });
  } else if (batch && company) {
    students.getSelectedStudentsByCompanyBatch(
      batch,
      company,
      (err, result) => {
        if (err) {
          console.error("Error :" + err.message);
          res.status(404).send();
        } else {
          console.log("Get Student control function");
          res.status(200);
          res.send(result.data);
        }
      }
    );
  } else if (batch) {
    students.getStudentsByBatch(batch, (err, result) => {
      if (err) {
        console.error("Error :" + err.message);
        res.status(404).send();
      } else {
        console.log("Get Student control function");
        res.status(200);
        res.send(result.data);
      }
    });
  } else if (isSelected) {
    students.getSelectedStudents(isSelected, (err, result) => {
      if (err) {
        console.error("Error :" + err.message);
        res.status(404).send();
      } else {
        console.log("Get Student control function");
        res.status(200);
        res.send(result.data);
      }
    });
  } else if (company) {
    students.getSelectedStudentsByCompany(company, (err, result) => {
      if (err) {
        console.error("Error :" + err.message);
        res.status(404).send();
      } else {
        console.log("Get Student control function");
        res.status(200);
        res.send(result.data);
      }
    });
  } else {
    students.getStudents((err, result) => {
      if (err) {
        console.error("Error :" + err.message);
        res.status(404).send();
      } else {
        console.log("Get Student control function");
        res.status(200);
        res.send(result.data);
      }
    });
  }
};

// Get students based on index number.
exports.getStudent = (req, res) => {
  var studentId = req.params.studentId;
  var batchId = req.query.batch;

  if (batchId) {
    console.log("batch");
    students.getStudentByIdAndBatch(studentId, batchId, (err, result) => {
      if (err) {
        console.error("Error :" + err);
        res.status(404).send();
      } else {
        res.status(200);
        res.send(result);
      }
    });
  } else {
    students.getStudentById(studentId, (err, result) => {
      if (err) {
        console.error("Error :" + err);
        res.status(404).send();
      } else {
        res.status(200);
        res.send(result);
      }
    });
  }
};

// Create a student.
exports.createBasicStudent = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400);
    res.send({
      message: "Content can not be empty!"
    });
  } else if (!req.body.batchId) {
    res.status(400);
    res.send({
      message: "BatchId cannot be empty"
    });
  } else if (!req.body.createdBy) {
    res.status(400);
    res.send({
      message: "Please log as admin"
    });
  } else if (!req.body.email) {
    res.status(400);
    res.send({
      message: "Invalid email address"
    });
  } else if (!req.body.nameWithInitials) {
    res.status(400);
    res.send({
      message: "Name cannot be empty"
    });
  } else if (!req.body.password) {
    res.status(400);
    res.send({
      message: "Password cannot be empty"
    });
  } else if (!req.body.indexNumber) {
    res.status(400);
    res.send({
      message: "Index number cannot be empty"
    });
  }

  // Create a student
  const student = new students.BasicStudent({
    createdBy: req.body.createdBy,
    email: req.body.email,
    nameWithInitials: req.body.nameWithInitials,
    indexNumber: req.body.indexNumber,
    password: req.body.password
  });

  const studentHasBatch = new students.StudentHasBatch({
    batchId: req.body.batchId,
    indexNumber: req.body.indexNumber
  });

  students.createBasicStudent(student, studentHasBatch, (err, result) => {
    if (err) {
      console.error("Error :" + err);
      res.status(400).send();
    } else {
      console.log("Get Student control function");
      res.status(200);
      res.send(result.data);
    }
  });
};

// Update student information.
exports.updateStudent = (req, res) => {
  var batch = req.query.batch;
  if (batch) {
    updateStudentInfo(req, (err, result) => {
      if (err) {
        res.status(400).send();
      } else {
        updateStudentHasBatchInfo(req, (err, result) => {
          if (err) {
            res.status(400).send();
          } else {
            updateStudentSelectCompanyInfo(req, (err, result) => {
              if (err) {
                res.status(400).send();
              } else {
                res.status(200).send({ message: "ok" });
              }
            });
          }
        });
      }
    });
  } else {
    res.status(400).send();
  }
};

const updateStudentInfo = (req, isUpdated) => {
  var studentId = req.params.studentId;
  const student = new students.Student({
    email: req.body.email,
    fullName: req.body.email,
    nameWithInitials: req.body.nameWithInitials,
    indexNumber: studentId,
    telephoneNumber: req.body.telephoneNumber,
    gpa: req.body.gpa,
    PreferedArea1: req.body.PreferedArea1,
    PreferedArea2: req.body.PreferedArea2,
    PreferedArea3: req.body.PreferedArea3
  });
  students.updateStudent(student, (err, result) => {
    if (err) {
      isUpdated(err, null);
    } else {
      isUpdated(null, result);
    }
  });
};

const updateStudentHasBatchInfo = (req, isUpdated) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  const student = {
    cv: req.body.cv,
    dateOfStart: req.body.startDate,
    indexNumber: studentId,
    batchId: batch
  };
  students.updateStudentHasBatch(student, (err, result) => {
    if (err) {
      isUpdated(err, null);
    } else {
      isUpdated(null, result);
    }
  });
};

const updateStudentSelectCompanyInfo = (req, isUpdated) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  var error;
  req.body.companies.forEach(value => {
    var student = {
      batchId: batch,
      indexNumber: studentId,
      companyId: value
    };
    students.updatedStudentSelectCompany(student, (err, result) => {
      if (err) {
        error = err;
        isUpdated(error, null);
      }
    });
  });
  isUpdated(null, { message: "updated" });
};

// Remove student.
exports.removeStudent = (req, res) => {
  var batch = req.query.batch;
  if (batch) {
    var studentId = req.params.studentId;

    students.removeStudentHasBatch(studentId, batch, (err, result) => {
      if (err) {
        res.status(500).send();
      } else {
        // If no one is removed
        if (result.data.affectedRows == 0) {
          res
            .status(400)
            .send({ message: "There is no student associated with this batch" });
        } else {
          students.removeStudent(studentId, (err, result) => {
            if (err) {
              res.status(400).send({ message: "Cannot removed the student" });
            } else {
              if (result.data.affectedRows == 0) {
                res.status(400).send({ message: "There is no such student" });
              } else {
                res.status(200).send({ message: "Removed Successfully" });
              }
            }
          });
        }
      }
    });
  } else {
    res.status(400).send({ message: "Please define the batch" });
  }
};
