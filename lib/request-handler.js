var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
var Users = require('../app/collections/users');
var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Links.reset().fetch().then(function(links) {
    res.status(200).send(links.models);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;
  console.log('-- saveLink -- 38 --');
  console.log(uri);
  // var generateCode = function(uri) {
  //   var shasum = crypto.createHash('sha1');
  //   shasum.update(uri);
  //   return shasum.digest('hex').slice(0, 5);
  // };

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }

  Link.findOne({ url: uri }).then(function(found) {
    if (found) {

      res.status(200).send(found);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.sendStatus(404);
        }
        var newLink = new Link({
          url: uri,
          title: title,
          baseUrl: req.headers.origin,
          code: util.generateCode(uri)
        });
        newLink.save().then(function(newLink) {
            //add linke to db TODO; FIX ME
          //Links.add(newLink);
          res.status(200).send(newLink);
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log('--- 80 ---- loginUser ');
  User.findOne({ username: username })
    .then(function(user) {
      if (!user) {
        res.redirect('/login');
      } else {

        util.comparePassword(password, user.password, function(match) {
    
          if (match) {
          
            util.createSession(req, res, user);
          } else {
            res.redirect('/login');
          }
        });
      }
    });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username })
    .then(function(user) {
      if (!user) {
        var hashPassword = util.hashPassword(password);
        console.log(hashPassword);
        var newUser = new User({
          username: username,
          password: password
        });
        //console.log('113', newUser);
        newUser.save()
          .then(function(newUser) {
            //Users.add(newUser);
            console.log('----- 116 ----> ALL OK!?', newUser);
            util.createSession(req, res, newUser);
            console.log('AFTER CREATESESSION');
          });
      } else {
        console.log('Account already exists');
        res.redirect('/signup');
      }
    });
};

exports.navToLink = function(req, res) {
  Link.findOne({ code: req.params[0] }).then(function(link) {
    if (!link) {
      res.redirect('/');
    } else {

      //fix getters and setters if necessary
      link.set({ visits: link.get('visits') + 1 })
        .save()
        .then(function() {
          return res.redirect(link.get('url'));
        });
    }
  });
};