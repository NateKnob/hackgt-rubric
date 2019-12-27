var express = require('express');
var router = express.Router();

var passport = require('passport');
const { Course, Grade, Category, User } = require('../model');

// List All Course
router.get('/', function (req, res) {
  Course.find({}, function(err, courses) {
    res.send(courses);
  });
})

// Create or Update a Course
router.post('/', function (req, res) {
  // If not logged in
  if (!req.user) {
    res.send(403)
  }
  // If submission includes an ID
  if (req.body._id) {
    // Look up by ID
    Course.findById(req.body._id, (err, c) => {
      if (c) {
        c.overwrite(body);
        c.save();
      } else {
        let newCourse = new Course(req.body);
        newCourse.save();
      }
    }).then(() => {
      res.send(200);
    })
  } else {
    let newCourse = new Course(req.body);
    newCourse.save();
    res.send(200);
  }

})

// Get Course By ID
router.get('/:id', function (req, res) {
  let id = req.params.id;
  Course.findById(id, (err, c) => {
    if (err) {
      res.send(500);
    } else {
      c_obj = c.toObject();
      // res.json(c_obj);
      Promise.all([
        User.findById(c_obj.owner_id, (err, user) => {
          if (!err) {
            c_obj.owner_name = user.username;
          }
        }),
        Grade.find({ course: id }, (err, grades) => {
          if (!err) {
            c_obj.grades = grades;
          }
        }),
        Category.find({ course: id }, (err, categories) => {
          if (!err) {
            c_obj.categories = categories;
          }
        })
      ]).then((values) => {
        res.json(c_obj);
      })
    }
  });
})

module.exports = router;
