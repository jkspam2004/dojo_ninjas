console.log("server topics controller");

/* controller method for Ninja model */
var mongoose = require('mongoose');
var Ninja = mongoose.model('Ninja');
var Topic = mongoose.model('Topic');
var Comment = mongoose.model('Comment');

function Controller() {
  /* get all results for topics */
  /* don't need to get all comments. just use length in client side to get count of comments */
  this.index = function(req, res) {
    console.log("server topics index");
    Topic.find({})
      .populate({ path: "_poster" })
      .exec(function(err, results) {
      if (err) {
        console.log("error finding results");
        res.json({ status: false, result: err });
      } else {
        console.log("found results", results);
        res.json({ status: true, result: results });
      }
    });
  };
  /* add one topic to topic table. */
  this.create = function(req, res) {
    console.log("server create topics body: ", req.body);
    Ninja.findOne({ _id: req.body.userid }, function(err, user) {
      if (err) {
        res.json({ status: false, result: err });
      } 

      var topic = new Topic({ 
        topic:    req.body.topic, 
        category: req.body.category,
        _poster:  user._id,
      });

      topic.save(function(err) {
        if (err) {
          res.json({ status: false, result: err });
        } else {
          res.json({ status: true, result: topic });
        }
      });
    });
  };

  /* get all comments for a topic */
  this.show = function(req, res) {
    console.log("server show a topic: ", req.params);
    Topic.findOne({_id: req.params.id})
      .sort({createdAt: -1})
      .populate({ path: "_poster" })
      .populate({ path: "comments", populate: { path: "_poster" }})
      .exec(function(err, comments) {
      if (err) {
        console.log("something went wrong loading topic");
        res.json({ status: false, result: err });
      } else {
        console.log("loading comments successful");
        res.json({ status: true, result: comments });
      }
    })
  }
  /* add an comment to comment table in response to a topic. then update comments array in topic table. */
  this.addComment = function(req, res) {
    console.log("server addComment body: ", req.body);
    Topic.findOne({ _id: req.body._id }, function(err, topic) { // make sure topic exists
      if (err) {
        res.json({ status: false, result: err });
      } else {
        Ninja.findOne({ _id: req.body.userid }, function(err, user) { // make sure user exists
          if (err) {
            res.json({ status: false, result: err });
          } else {
            var comment = new Comment({ 
              comment:    req.body.comment, 
              _topic: topic._id,
              _poster:   user._id
            });

            comment.save(function(err) { // save comment
              if (err) {
                res.json({ status: false, result: err });
              } else {
                topic.comments.push(comment);
                topic.save(function(err) { // save topic
                  if (err) {
                    res.json({ status: false, result: err });
                  } else {
                    res.json({ status: true, result: comment });
                  }
                });
              }
            }); // end comment.save
          }
        }); // end Ninja.findOne
      }
    }); // end Topic.findOne
  };

  /* add likes. push user object into likes field in comment table */
  this.addLike = function(req, res) {
    console.log("server addLike", req.body);
    Comment.findOne({ _id: req.body._id }, function(err, comment) {
      if (err) {
        res.json({ status: false, result: err });
      } else {
        Ninja.findOne({ _id: req.body.userid }, function(err, user) { // make sure user exists
          if (err) {
            res.json({ status: false, result: err });
          } else {
            comment.likes.push(user);
            comment.save(function(err) { // save comment
              if (err) {
                res.json({ status: false, result: err });
              } else {
                res.json({ status: true, result: comment });
              }
            });
          }
        }); // end Ninja.findOne
      }   
    }); // end Comment.findOne
  }
}
module.exports = new Controller();


