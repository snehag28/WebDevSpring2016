#!/bin/env node
var express = require('express');
var app = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
// install and require the mongoose library
var mongoose      = require('mongoose');
// create a default connection string
var connectionString = 'mongodb://localhost/WebDev';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//require("./public/project/server/app.js")(app, db, mongoose);
//require("./public/project/server/services/user.service.server.js")(app);
//require("./public/project/server/services/book.service.server.js")(app);

require("./public/assignment/server/app.js")(app, db, mongoose);
//require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);
