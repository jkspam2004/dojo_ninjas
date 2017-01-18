console.log("server gallery model");

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Schema variable used to understand Schema.Types.ObjectId in associations 
var newSchema = new mongoose.Schema({
  image: { 
    type: String, 
  },
  _poster: { // who posted the image
    type: Schema.Types.ObjectId, 
    ref: 'Ninja'
  },
  caption: { 
    type: String
  },
  campus: { 
    type: String
  },
}, { timestamps: true });
mongoose.model('Gallery', newSchema); // set our schema to model name
