FrontEnd
$ npm install
===========================================================================
Backend
$ npm init
To avoid question use flags;
eg:-(	name:ims
	version:1.0.0 & so on. 
     )
$ npm init –yes
Install express framework, mySql, and body-parser
$ npm install express –save (Express Framework)
$ npm install mysql –save (for connecting to DB)
$ npm install body-parser
o This is a node.js middleware for handling JSON, Raw, Text and URL encoded form data.
Server setup:
nodemon will help us to keep track of changes to our application by watching changed files and automatically restart the server.
$ npm install --save-dev nodemon

running backend
$ node index.js
============================================================================
DB configuration
    HOST: "localhost",
    USER: "root",
    PASSWORD: "test@123",
    DB: "testDB"

===========================================================================
Before login create tables for admin, student, and company. Then using those credentials 
log in can be done.