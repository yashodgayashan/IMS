const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
var cors = require('cors');
const port = process.env.PORT || 8080;
const dbConfig = require("./config/db.config.js");

// import routes
const studentRoutes = require('./routes/student.routes.js');
const loginRoutes = require('./routes/login.routes.js');

// create connection to database
var connection;

function handleDisconnect() {
    // Recreate the connection, since the old one cannot be reused.
    connection = mysql.createConnection(dbConfig);

    // The server is either down or restarting (takes a while sometimes).
    connection.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
        
        // We introduce a delay before attempting to reconnect,to avoid a hot loop, and to allow our node script to
        // process asynchronous requests in the meantime. If you're also serving http, display a 503 error.
        
        global.db = connection;
        console.log(`Connected to databsase ${dbConfig.HOST} >> ${dbConfig.DB}`);
    });


    /*Connection to the MySQL server is usually lost due to either server restart, or a
      connnection idle timeout (the wait_timeout server variable configures this) */

    connection.on('error', function (err) {
        console.log('db error', err);
        handleDisconnect();
    });
}

handleDisconnect();

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(cors());

// set routes to api
app.use('/student', studentRoutes);
app.use('/login', loginRoutes);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});