var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var winston = require('winston'), expressWinston = require('express-winston');
const ecsFormat = require('@elastic/ecs-winston-format');
require('winston-daily-rotate-file');

var https = require('https');
var http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var elkRouter = require('./routes/elk');

const PORT = 3000;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.json',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  level: 'debug'
});

// winston
app.use(expressWinston.logger({
  level: 'debug',
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    new winston.transports.Console({json: true,
      colorize: true}),
    fileRotateTransport,
    // new winston.transports.File({
    //   //path to log file
    //   filename: 'logs/log.json',
    //   level: 'debug'
    // }),
    // {
    //   port: 5043,
    //   host: 'localhost',
    //   ssl_enable: true,
    //   max_connect_retries: -1,
    // }
  ],
  responseWhitelist: [...expressWinston.responseWhitelist, 'body'],
  msg: 'HTTP {{req.method}} {{req.url}}',
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/elk', elkRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log('a');
});

// http.createServer(app).listen(80)
// https.createServer(options, app).listen(443)

app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
  // logger.info(`listening at http://localhost:${PORT}`)
})

module.exports = app;
