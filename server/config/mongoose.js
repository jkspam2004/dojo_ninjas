console.log("mongoose setup");

var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

var host = 'localhost';
var db = 'dojo_ninjas';
var dbURI = 'mongodb://' + host + '/' + db;

/* connect to the db */
mongoose.connect(dbURI);
mongoose.connection.on('connected', function() {
  console.log(`Mongoose default connection open to ${ dbURI }`);
});
/* error with db connection */
mongoose.connection.on('error', function(err) {
  console.error(`Mongoose default connection error: ${ err }`);
});
/*  db disconnected */
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});
/* close db connection when node process ends */
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

/* get paths to our models */
var models_path = path.join(__dirname, '../models');
var regex = new RegExp(".js$", "i"); // regex to catch files with .js extensions

/* require all javascript files in the models dir */
fs.readdirSync(models_path).forEach(function(file) {
  if (regex.test(file)) {
    require(path.join(models_path, file));
  }
});


