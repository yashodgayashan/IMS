const sql = require("./db.js");

// constructor
const Student = function(student) {
  this.id=student.id;
  this.email = student.email;
  this.name = student.name;
  this.password = student.password;

};

Student.findById = (studentId, result) => {
  sql.query(`SELECT * FROM student WHERE id='${studentId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.updateById = (id, student, result) => {
  sql.query(
    "UPDATE student SET email = ?, name = ?, password = ? WHERE id = ?",
    [student.email, student.name, student.password, student.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found student with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};

Student.remove = (id, result) => {
  sql.query("DELETE FROM student WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student with id: ", id);
    result(null, res);
  });
};

Student.removeAll = result => {
  sql.query("DELETE FROM student", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });
};

module.exports = Student;