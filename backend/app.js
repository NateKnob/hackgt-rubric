var createError = require('http-errors');
var path = require('path');
var express = require('express');
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors')

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Category, Grade, Class, User } = require('./model');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var app = express();


app.use(cors({origin:true,credentials: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/', require('./routes/index'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));

var dummy = require('./dummy.json');

const creds = require('./credentials.json');

mongoose.connect('mongodb+srv://admin:'+creds['mongo_password']+'@cluster0-dljvx.gcp.mongodb.net/test?retryWrites=true&w=majority', {
  dbName: 'rubrico_db',
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Mongo DB Connection Success")
}).catch(err => {
  console.log(err)
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
