/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),

var express = require('express');

// setup middleware
var app = express();
//app.use(app.router);
app.use(express.errorHandler());
app.use(express.bodyParser());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.set('view engine', 'vash');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

var mongodb = require('mongodb');
//TODO: add your connection string
var connectionString = "";
var pageController = require('./lib/pages.js');

//MongoDB recommends you do one connection on initialisation and let it handle connection pooling
mongodb.connect(connectionString, function(err, db){

console.log("MongoLab connection established");

var pages = new pageController(db);

app.get('/', function(req,res) { pages.Home(req, res);} );

app.post("/skype", function(req, res){ pages.Update(req,res);} );

var ApiController = require('./lib/api.js');
var api = new ApiController(db);

app.get("/api/users", function(req, res) { api.getUsers(req, res); });
app.get("/api/:user&:order", function(req, res) { api.getUserQuotes(req, res); });
app.get("/api", function(req, res) { api.getAllQuotes(req, res); });


//Auto-generated code which comes with the IBM Bluemix sample
// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');

// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);

// Start server
app.listen(port, host);
	console.log('App started on port ' + port);
});
