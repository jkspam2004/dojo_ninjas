console.log("server topic model");

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Schema variable used to understand Schema.Types.ObjectId in associations 
var newSchema = new mongoose.Schema({
  topic: { 
    type: String, 
    required: [true, "Topic is required"], 
    minlength: [10, "Topic must be at least 10 characters"] 
  },
  category: { // optional 
    type: String, 
  },
  _poster: { // who posted the topic
    type: Schema.Types.ObjectId, 
    ref: 'Ninja'
  },
  comments: [{ // topic can have many comments 
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true });
mongoose.model('Topic', newSchema); // set our schema to model name
