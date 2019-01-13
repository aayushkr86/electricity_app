var express = require('express')
var router = express.Router()
var users = require('../users/index')
var tickets = require('../tickets/index')
var powercut = require('../powercut/index')
var notification = require('../notification/index')
var passloginvalidator = require('../passport/pass_loginvalidator')

module.exports = router

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/user', users)                                      // user microservice
router.use('/tickets',passloginvalidator.isLoggedIn, tickets)   // tickets microservice
router.use('/powercut', powercut)                               // powercut microservice
router.use('/notification', notification)                       // notification microservice

// error handler
router.use(function (err, req, res, next) {
  console.log('error:', err) ;
  res.status(err.status || 422).send({'error': err.message ||err})
})
