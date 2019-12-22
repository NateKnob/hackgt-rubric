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

const { Category, Grade, Class } = require('./model');

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

const creds = require('./credentials.json');

mongoose.connect('mongodb+srv://admin:'+creds['mongo_password']+'@cluster0-dljvx.gcp.mongodb.net/test?retryWrites=true&w=majority', {
  dbName: 'rubrico_db',
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
    if (c) {
      console.log("overwriting class")
      c.overwrite(body);
      c.save();
    } else {
      let newClass = new Class(body);
      newClass.save();
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
  let classname = req.params.classname;
  Class.findOne({name:classname}, (err,c) => {
    c_obj = c.toObject();
    Promise.all(
      [Grade.find({class:classname}, (err, grades) => {
        c_obj.grades = grades;
      }),
      Category.find({class:classname}, (err, rubric) => {
        c_obj.rubric = rubric
      })]
    ).then((err)=> {
      res.json(c_obj);
    })
  });
})

app.post('/class/:classname/grade', function (req, res) {
  let classname = req.params.classname
  let body = req.body;
  body.grade = Number(body.grade)
  body.class = classname
  let newGrade = new Grade(req.body);
  newGrade.save();
  console.log(newGrade);
  res.send({"status": "ok"})
})

app.post('/class/:classname/grade/delete', (req,res) => {
  let classname = req.params.classname
  let body = req.body;
  console.log(body);
  Grade.findById(body._id, function(err, g) {
    console.log("found")
    console.log(g)
    if ((!err) && (g)) {
      console.log("delete")
      g.delete();
    } else {
      console.log(err);
    }
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
