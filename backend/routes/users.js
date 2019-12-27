var express = require('express');
var router = express.Router();

var passport = require('passport');
const { User } = require('../model');

router.get('/', function (req, res) {
  User.find({}, function(err, users) {
    var userMap = {};
    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
});

router.post('/register',
  function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        return res.send("registration error", 404);
      }
      res.send(200);
    });
});

router.get('/me', function(req, res) {
  res.json({ user : req.user });
});

router.post('/login',
  passport.authenticate('local'),
  function (req, res) {
    res.send(200);
  }
);

router.get('/logout', function(req, res) {
  req.logout();
  res.json({ user : null });
});

router.get('/ping', function(req, res){
  res.send("pong!", 200);
});

module.exports = router;
