const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const dbConfig = require('./models/db.js');
const port = process.env.PORT || 8080;

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
        /*
            We introduce a delay before attempting to reconnect,
            to avoid a hot loop, and to allow our node script to
            process asynchronous requests in the meantime.
            If you're also serving http, display a 503 error.
        */
        global.db = connection;
        console.log(`Connected to database ${dbConfig.host} >> ${dbConfig.database}`);
    });


    /*
      Connection to the MySQL server is usually
      lost due to either server restart, or a
      connnection idle timeout (the wait_timeout
      server variable configures this)
    */
    connection.on('error', function (err) {
        console.log('db error', err);
        handleDisconnect();
    });
}

handleDisconnect();

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
// app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
// app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// import routes
const studentRoutes = require('./routes/student.routes.js');
// const categoryRoutes = require('./routes/category');
// const productRoutes = require('./routes/product');
// const shippingRoutes = require('./routes/shipping');
// const customerRoutes = require('./routes/customer');
// const orderRoutes = require('./routes/order');

app.get('/', function (request, response, next) {
    db.query("SELECT * FROM students", function (error, rows) {
        return response.json(rows);
    });
});

// set routes to api
app.use('/api/student', studentRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/product', productRoutes);
// app.use('/api/shipping', shippingRoutes);
// app.use('/api/customer', customerRoutes);
// app.use('/api/order', orderRoutes);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});