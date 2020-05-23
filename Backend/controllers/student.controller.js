const Student = require("../models/student.model.js");
const sql = require("../models/db.js");

// Create and Save a new student
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a student
  const student = new Student({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  sql.query("INSERT INTO student SET ?", student, (err, result) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message: "Error inserting student with id " + student.id
      });
    } else {
      console.log("created student: ", { id: result.insertId, ...student });
      return res.json(result);
    }
  });
};

// Retrieve all students from the database.
exports.findAll = (req, res) => {
  console.log("student: ");
  sql.query("SELECT * FROM student", (err, result) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message: "Error finding students "
      });
    } else {
      console.log("student: ", result);
      return res.json(result);
    }
  });
};

// Find a single student with a studentId
exports.findOne = (req, res) => {
  sql.query(`SELECT * FROM student WHERE id='${req.params.studentId}'`, (err, data) => {
    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message: "Error retrieving student with id " + req.params.studentId
      });
    } else if (!(data.length)) {
      res.status(404).send({
        message: `Not found student with id ${req.params.studentId}.`
      });
    } else {
      console.log("found student: ", data[0]);
      return res.send(data);
    }
  });
};



// Update a student identified by the studentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  sql.query(
    "UPDATE student SET email = ?, name = ?, password = ? WHERE id = ?",
    [req.body.email, req.body.name, req.body.password, req.body.id], (err, data) => {
      if (err) {
        console.log("error: ", err);
        res.status(500).send({
          message: "Error retrieving student with id " + req.params.studentId
        });
      } else if (data.affectedRows == 0) {
        res.status(404).send({
          message: `Not found student with id ${req.params.studentId}.`
        });
      } else {
        return res.send(data);
      }
    }
  );
}
// const error: IApiError = {
//       id: 'modelMissing',
//       message: 'the model is missing in the request'
//     };

//     return res.status(400).json({
//       error: error
//     });
// Delete a student with the specified studentId in the request
exports.delete = (req, res) => {
  sql.query("DELETE FROM student WHERE id = ?", req.params.studentId, (err, result) => {

    if (err) {
      console.log("error: ", err);
      res.status(500).send({
        message: "Could not delete student with id " + req.params.studentId
      });
    } else if (result.affectedRows == 0) {
      res.status(404).send({
        message: `Not found student with id ${req.params.studentId}.`
      });
    } else {
      // console.log("deleted student with id: ", id);
      res.send({ message: `student was deleted successfully!` });
    }
  });
}

// Delete all students from the database.
exports.deleteAll = (req, res) => {

  sql.query("DELETE FROM student", (err, result) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students."
      });
    }
    else {
      console.log(`deleted ${result.affectedRows} students`);
      res.send({ message: `All students were deleted successfully!` });
    }
  });
};

