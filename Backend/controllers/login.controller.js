const Student = require("../models/student.model.js");
const Organization = require("../models/organization.model.js");
const Admin = require("../models/admin.model.js");
const sql = require("../models/db.js");

exports.findUser = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    if ((req.body.type) == "Student") {
        try {
            let query = `SELECT password FROM student WHERE id = '${req.body.id}'`; // query database to get all the departments

            // execute query
            sql.query(query, (error, result) => {
                if (error != null) res.status(500).send({ error: error.message });
                var match = (req.body.password).localeCompare(JSON.stringify(result));
                console.log(match);
                // return res.json(result);
                return res.json(match);
            });
        } catch (error) {
            if (error != null) res.status(500).send({ error: error.message });
        }
    } else if ((req.body.type) == "Admin") {
        try {
            let query = `SELECT password FROM admin WHERE id = '${req.body.id}'`; // query database to get all the departments

            // execute query
            sql.query(query, (error, result) => {
                if (error != null) res.status(500).send({ error: error.message });
                var match = (req.body.password).localeCompare(JSON.stringify(result));
                console.log(match);
                // return res.json(result);
                return res.json(match);
            });
        } catch (error) {
            if (error != null) res.status(500).send({ error: error.message });
        }
    } else {
        try {
            let query = `SELECT password FROM organization WHERE id = '${req.body.id}'`; // query database to get all the departments

            // execute query
            sql.query(query, (error, result) => {
                if (error != null) res.status(500).send({ error: error.message });
                var match = (req.body.password).localeCompare(JSON.stringify(result));
                console.log(match);
                // return res.json(result);
                return res.json(match);
            });
        } catch (error) {
            if (error != null) res.status(500).send({ error: error.message });
        }
    }
}