var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var bokning = require('./routes/bokning');
var ansokning = require('./routes/ansokning')
var mongoose = require('mongoose');

var app = express();

var promise = mongoose.connect('mongodb://ECGrupp3:Frontend2016@cluster0-shard-00-00-dmlri.mongodb.net:27017,cluster0-shard-00-01-dmlri.mongodb.net:27017,cluster0-shard-00-02-dmlri.mongodb.net:27017/fordondb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
  useMongoClient: true,
  /* other options */
});
/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ECGrupp3:Frontend2016@cluster0-shard-00-00-dmlri.mongodb.net:27017,cluster0-shard-00-01-dmlri.mongodb.net:27017,cluster0-shard-00-02-dmlri.mongodb.net:27017/fordondb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/bokning', bokning);
app.use('/ansokning', ansokning);
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
