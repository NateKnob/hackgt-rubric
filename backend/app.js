var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {AssignmentCategory, Grade, Class} = require('./model');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cors());

var dummy = require('./dummy.json');

mongoose.connect('mongodb://localhost/rubric', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/class/', function (req, res) {
  let body = req.body;
  Class.findOne({name:req.body.name}, (err, c) => {
    if (err) {
      let newClass = new Class(body);
      newClass.save();
    } else {
      console.log("overwriting class")
      c.overwrite(body);
      c.save();
    }
  }).then(() => {
    res.json({'status':'ok'})
  })
})

app.get('/class/', function (req, res) {
  Class.find({}, function(err, classes) {
    res.send(classes);
  });
})

app.get('/class/:classname', function (req, res) {
  res.json(Class.find({name:req.params.classname}))
})

app.post('/class/:classname/grade', function (req, res) {
  let classname = req.params.classname
  let body = req.body;
  let newGrade = new Grade(req.body);
  newGrade.save();
  Class.findOne({name:classname}, function(err, c) {
    c.grades.push(newGrade);
  })
  res.send({"status": "ok"})
})

app.post('/class/:classname/grade/delete', (req,res) => {
  let classname = req.params.classname
  let body = req.body;
  Grade.findOne({name:body.name}, function(err, g) {
    g.delete();
  })
  res.send({"status": "ok"})
})

// app.get('/class/:classname/grades', function (req, res) {
//   Grade.find({}, function(err, grades) {
//     res.json(grades);
//   });
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
