const sql = require("../models/db.js");
const jwtLogin = require("jwt-login");
const roles = require("user-groups-roles");
const jwt = require('jsonwebtoken');

exports.findUser = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    if ((req.body.type) == "Student") {
        try {
            let query = `SELECT * FROM student WHERE id = '${req.body.id}' AND password = '${req.body.password}'`;

            // execute query
            sql.query(query, (error, result) => {
                if (error != null){
                    res.status(500).send({ error: error.message });
                } else if (result.length == 1) {
                    var user = req.body.id;

                    // token expires in 24 hours
                    let token = jwt.sign({ user },"topsecret", {expiresIn: '24h'});
                    
                    // return the JWT token for the future API calls
                    res.send(200).json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    res.send(403).json({
                        success: false,
                        message: 'Incorrect username or password'
                      });
                }
                res.end();
            });
        } catch (error) {
            if (error != null) res.status(500).send({ error: error.message });
        }
    } else if ((req.body.type) == "Admin") {
        try {
            let query = `SELECT password FROM admin WHERE id = '${req.body.id}' AND password = '${req.body.password}'`; 

            // execute query
            sql.query(query, (error, result) => {
                if (error != null){
                    res.status(500).send({ error: error.message });
                } else if (result.length == 1) {
                    var user = req.body.id;

                    // token expires in 24 hours
                    let token = jwt.sign({ user },"topsecret", {expiresIn: '24h'});
                    
                    // return the JWT token for the future API calls
                    res.send(200).json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    res.send(403).json({
                        success: false,
                        message: 'Please register'
                      });
                }
                res.end();
            });
        } catch (error) {
            if (error != null) res.status(500).send({ error: error.message });
        }
    } else {
        try {
            let query = `SELECT password FROM organization WHERE id = '${req.body.id}' AND password = '${req.body.password}'`; 

           // execute query
           sql.query(query, (error, result) => {
            if (error != null){
                res.status(500).send({ error: error.message });
            } else if (result.length == 1) {
                var user = req.body.id;

                // token expires in 24 hours
                let token = jwt.sign({ user },"topsecret", {expiresIn: '24h'});
                
                // return the JWT token for the future API calls
                res.send(200).json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                  });
            }
            res.end();
        });
        } catch (error) {
            if (error != null) res.status(500).send({ error: error.message });
        }
    }
}
exports.logOut = (req, res) => {
    jwtLogin.signout(req, res, false);
}

exports.valid_login = (req,res, next)=>{
    try {
        req.jwt = jwtLogin.validate_login(req, res);
        next();
    } catch (error) {
        res.send500(req, res, error);
        
    }
}