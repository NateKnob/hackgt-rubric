var express = require('express');
var router = express.Router();

var passport = require('passport');
const { Course, Grade, Category, User } = require('../model');

// Add a new grade in a specific course
router.post('/grades', function (req, res) {
  let course_id = req.params.course_id;
  req.body.grade = Number(req.body.grade)
  req.body.course = course_id
  let newGrade = new Grade(req.body);
  newGrade.save();
  res.send(200)
})

router.post('/grades/delete', (req, res) => {
  let course_id = req.params.course_id;

  Grade.findById(body._id, function(err, g) {
    if (err) {
      res.send(500);
    } else {
      g.delete();
      res.send(200);
    }
  })
})

router.get('/grades', function (req, res) {
  if (!req.user) {
    res.send(403);
  } else {
    Grade.find({ user: req.user._id }, function(err, grades) {
      res.json(grades);
    });
  }
})

module.exports = router;
