console.log("server comment model");

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Schema variable used to understand Schema.Types.ObjectId in associations 
var newSchema = new mongoose.Schema({
  comment: { 
    type: String, 
    required: [true, "Comment is required"], 
    minlength: [4, "Comment must be at least 4 characters"] 
  },
  _poster: { // who posted the comment
    type: Schema.Types.ObjectId, 
    ref: 'Ninja'
  },
  _topic: { // refers to the topic this comment is addressing 
    type: Schema.Types.ObjectId, 
    ref: 'Question'
  },
  detail: { // optional supporting detail
    type: String
  },
  likes: [{ // list of userids who likes the comment 
    type: Schema.Types.ObjectId,
    ref: 'Ninja'
  }],
}, { timestamps: true });
mongoose.model('Comment', newSchema); // set our schema to model name
