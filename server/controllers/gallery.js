console.log("server gallery controller");

/* controller method for Ninja model */
var mongoose = require('mongoose');
var Ninja = mongoose.model('Ninja');
var Gallery = mongoose.model('Gallery');

function Controller() {
  /* get all results for gallerys */
  /* don't need to get all comments. just use length in client side to get count of comments */
  this.index = function(req, res) {
    console.log("server gallerys index");
    Gallery.find({}, function(err, results) {
      if (err) {
        console.log("error finding results");
        res.json({ status: false, result: err });
      } else {
        console.log("found results", results);
        res.json({ status: true, result: results });
      }
    });
  };
  /* add one gallery to gallery table. */
  this.create = function(req, res) {
    console.log("server create gallerys body: ", req.body);
    Ninja.findOne({ _id: req.body.userid }, function(err, user) {
      if (err) {
        res.json({ status: false, result: err });
      } 

      var gallery = new Gallery({ 
        image:    req.body.image, 
        caption: req.body.caption,
        _poster:  user._id,
      });

      gallery.save(function(err) {
        if (err) {
          res.json({ status: false, result: err });
        } else {
          res.json({ status: true, result: gallery });
        }
      });
    });
  };


}
module.exports = new Controller();


