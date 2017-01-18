console.log("server ninjas controllers");

/* controller method for Ninja model */
var mongoose = require('mongoose');
var Ninja = mongoose.model('Ninja');

function Controller() {
    /* login - check email and password */
    this.login = function(req, res) {
        Ninja.findOne({ email: req.body.email, password: req.body.password }, function(err, result) {
            if (err) {
                throw err;
            }
            if (!result) {
                res.json({ success: false, message: "Login failed" });
            } else {
                res.json({ success: true, message: "Found user", result: result });
            }
        });
    };

  /* get all results for ninjas */
  this.getByCampus = function(req, res) {
    console.log("server ninjas index");
    Ninja.find({ campus: req.params.campus }).sort({ cohort: "asc" }).exec( function(err, results) {
      if (err) {
        console.log("error finding results");
        res.json({ status: false, result: err });
      } else {
        console.log("found results", results);
        res.json({ status: true, result: results }); 
      }
    });
  };
  /* add one ninja */
  this.create = function(req, res) {
    console.log("server ninjas create", req.body); 
    var ninja = new Ninja({
      first_name:     req.body.first_name,      
      last_name:      req.body.last_name,      
      email:          req.body.email,      
      password:       req.body.password,      
      campus:         req.body.campus,      
      cohort:         req.body.cohort,      
      status:         req.body.status,      
      avatar:         req.body.avatar,      
      role:           req.body.role,      
      job_status:     req.body.job_status,      
      linkedin_site:  req.body.linkedin_site,      
      github_site:    req.body.github_site,      
      portfolio_site: req.body.portfolio_site,      
    });

    ninja.save(function(err) {
      if (err) {
        console.log("error saving ninja", err);
        res.json({ status: false, result: err });
      } else {
        res.json({ status: true, result: ninja });
      }
    });
  };
  /* get ninja info by id */
  this.getById = function(req, res) {
    console.log("server getById", req.params);
    Ninja.findOne({ _id: req.params.id }, function(err, result) {
      if (err) {
        res.json({ status: false, result: err });
      } else {
        res.json({ status: true, result: result });
      }
    });
  };
  /* get ninja info by email */
  this.getByEmail = function(req, res) {
    console.log("server getByEmail", req.params);
    Ninja.findOne({ email: req.params.email }, function(err, result) {
      if (err) {
        res.json({ status: false, result: err });
      } else {
        res.json({ status: true, result: result });
      }
    });
  };
  /* delete a ninja */
  this.delete = function(req, res) {
    console.log("server delete body", req.body);
    console.log("server delete params", req.params);
    Ninja.remove({ _id: req.params.id }, function(err) {
      if (err) {
        res.json({ status: false, result : err });
      } else {
        res.json({ status: true, result: "successfully removed " + req.params });
      }
    });
  };
  /* update a ninja */
  this.update = function(req, res) {
    console.log("server update params", req.params);
    console.log("server update body", req.body);
    Ninja.findOne({ _id: req.body._id }, function(err, ninja) {
      if (err) {
        res.json({ status: false, result: err });
      } else {
        ninja.first_name = req.body.first_name;
        ninja.last_name = req.body.last_name;
        ninja.email = req.body.email;
        ninja.password = req.body.password;
        ninja.campus = req.body.campus;
        ninja.cohort = req.body.cohort;
        ninja.status = req.body.status;
        ninja.avatar = req.body.avatar;
        ninja.role = req.body.role;
        ninja.job_status = req.body.job_status;
        ninja.linkedin_site = req.body.linkedin_site;
        ninja.github_site = req.body.github_site;
        ninja.portfolio_site = req.body.portfolio_site;
       
        ninja.save( function(err) {
          console.log("saving");
          if (err) {
            res.json({ status: false, result: err });
          } else {
            res.json({ status: true, result: ninja });
          }
        }); 
      }
    });
  };
}
module.exports = new Controller();


