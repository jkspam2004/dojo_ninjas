/* import modules */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/* constants */
var root = __dirname;
var port = 8003;

/* use modules */;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(root, './client')));
app.use(express.static(path.join(root, './bower_components')));

/* get our models */
require('./server/config/mongoose.js');

/* get our routes */
var routes_setter = require('./server/config/routes.js');
routes_setter(app);

/* start server */
var server = app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

/* server side socket listening events */
var socket = require('./server/config/socket.js')(app, server); // exported functions stored in var socket


