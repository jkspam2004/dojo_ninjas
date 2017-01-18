var mongoose = require('mongoose');
require('mongoose-type-email');

var Schema = mongoose.Schema;
var newSchema = new mongoose.Schema({
  first_name: { 
    type: String, 
    required: [true, "First Name is required"], 
    minlength: [3, "First Name must be at least characters"] 
  },
  last_name: {
    type: String, 
    required: [true, "Last Name is required"], 
    minlength: [3, "Last Name must be at least characters"] 
  },
  //email: {type: mongoose.SchemaTypes.Email, required: true}, 
  email: {
    type: String,
    required: [true, "Email is required"], 
    validate: function(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  password: {
    type: String, 
    required: [true, "Password is required"], 
    minlength: [8, "Last Name must be at least 8 characters"] 
  },
  campus: { type: String }, 
  cohort: { type: String },
  status: { type: String },
  avatar: { type: String },
  role: { type: String },
  job_status: { type: String }, 
  linkedin_site: { type: String },
  github_site: { type: String },
  portfolio_site: { type: String },
}, { timestamps: true });

mongoose.model('Ninja', newSchema);
