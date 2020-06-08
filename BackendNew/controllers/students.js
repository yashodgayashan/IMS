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

  console.log(req.body);
  // Create a student
  const student = new BasicStudent({
    createdBy: req.body.createdBy,
    email: req.body.email,
    nameWithInitials: req.body.nameWithInitials,
    indexNumber: req.body.indexNumber,
    password: req.body.password
  });

  const studentHasBatch = new StudentHasBatch({
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
  students.getStudentCreater(studentId, (err, result) => {
    if (err) {
      isUpdated(err, null);
    } else {
      // Get createBy user.
      var createdBy = result.creater;
      students.getStudentPassword(studentId, (err, result) => {
        if (err) {
          isUpdated(err, null);
        } else {
          var password = result.password;
          const student = new Student({
            createdBy: createdBy,
            email: req.body.email,
            fullName: req.body.email,
            nameWithInitials: req.body.nameWithInitials,
            indexNumber: studentId,
            password: password,
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
        }
      });
    }
  });
};

const updateStudentHasBatchInfo = (req, isUpdated) => {
  var studentId = req.params.studentId;
  var batch = req.query.batch;
  // convert date
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

// Basic student model.
const BasicStudent = function(student) {
  this.createdBy = student.createdBy;
  this.roleName = "Student";
  this.email = student.email;
  this.nameWithInitials = student.nameWithInitials;
  this.indexNumber = student.indexNumber;
  this.password = student.password;
};

// Student model.
const Student = function(student) {
  this.createdBy = student.createdBy;
  this.roleName = "Student";
  this.email = student.email;
  this.fullName = student.fullName;
  this.nameWithInitials = student.nameWithInitials;
  this.indexNumber = student.indexNumber;
  this.password = student.password;
  this.phoneNumber = student.telephoneNumber;
  this.Sem1GPA = student.gpa.first_sem;
  this.Sem2GPA = student.gpa.second_sem;
  this.Sem3GPA = student.gpa.third_sem;
  this.Sem4GPA = student.gpa.fourth_sem;
  this.SGPA = student.gpa.SGPA;
  this.PreferedArea1 = student.PreferedArea1;
  this.PreferedArea2 = student.PreferedArea2;
  this.PreferedArea3 = student.PreferedArea3;
};

// Student has batch model.
const StudentHasBatch = function(studentHasBatch) {
  this.batchId = studentHasBatch.batchId;
  this.indexNumber = studentHasBatch.indexNumber;
};
