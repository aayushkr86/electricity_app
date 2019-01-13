var express = require('express')
var router = express.Router()
var app = express()
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var passport = require('passport')
var flash = require('flash')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var expressValidator = require('express-validator')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
// var cookieSession = require('cookie-session')
// var MongoStore =  require('express-mongoose-store')(session, mongoose)

//passport here is just declared,middleware is use in passport file
var localPassportSetup = require('./passport/passport_local')
var googlePassportSetup = require('./passport/passport_google')  
var facebookPassportSetup = require('./passport/passport_facebook')
var index = require('./routes/index')
var keys = require('./utils/config')

// app.use(cookieSession({
//   maxAge: 24*60*60*1000,
//   keys:[keys.session.cookieKey]
// }));

app.use(expressValidator()) //ex:req.checkBody

// mongoose connection
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/electricityapp')
mongoose.Promise = global.Promise // ES6 Promises
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
  console.log('Succesfully connected to database')
})

app.use(router);

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: 'work hard',
  resave: false,
  saveUninitialized: false,
  cookie:{ maxAge: 180 * 60 * 1000},       //180 mins
  store: new MongoStore({mongooseConnection: db})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated(); //variable available in all views ('login' is the name of the variable)
  res.locals.session = req.session;
  next();
})

// for Cross Origin Resource Sharing issue (CORS)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error',{
    message: err.message,
    error: {}
  })
})

module.exports = app
