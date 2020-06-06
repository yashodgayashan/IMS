const students = require("../models/students");
const companies = require("../models/company");

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

//get students based on index number
exports.getStudent = (req, res) => {
  var studentId = req.params.studentId;
  var batchId = req.query.batch;

  if (batchId) {
    console.log("batch");
    students.getStudentByIdAndBatch(studentId, batchId, (err, result) => {
      if (err) {
        console.error("Error :" + err);
        res.status(404);
      } else {
        res.status(200);
        res.send(result);
      }
    });
  } else {
    students.getStudentById(studentId, (err, result) => {
      if (err) {
        console.error("Error :" + err);
        res.status(404);
      } else {
        res.status(200);
        res.send(result);
      }
    });
  }
};

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
  const student = new BasicStudent({
    batchId: req.body.batchId,
    createdBy: req.body.createdBy,
    studentId: req.body.studentId,
    email: req.body.email,
    nameWithInitials: req.body.nameWithInitials,
    indexNumber: req.body.indexNumber,
    password: req.body.password
  });

  students.createBasicStudent(student, (err, result) => {
    if (err) {
      console.error("Error :" + err);
      res.status(404);
    } else {
      console.log("Get Student control function");
      res.status(200);
      res.send(result.data);
    }
  });
};

const BasicStudent = function(student) {
  this.batchId = student.batchId;
  this.createdBy = student.createdBy;
  this.roleId = 3;
  this.studentId = student.studentId;
  this.email = student.email;
  this.nameWithInitials = student.nameWithInitials;
  this.indexNumber = student.indexNumber;
  this.password = student.password;
};
