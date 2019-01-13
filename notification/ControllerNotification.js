var express = require('express')
var router = express.Router()
var MainNotification = require('./MainNotification')

module.exports = router

// response handler
function response (res,statuscode,err,data) {
  if (statuscode === 200) {
    var data = data;
  }else if(statuscode === 400) {
    if(data == []) {
      data = "Bad request";
    }
  }else{
    data = "something went wrong";
  }
  res.status(statuscode).json({ "message": data });
}

// send scheduled powercut email notification
router.post('/send-scheduled-powercut-email', function (req, res, next) {
  MainNotification.scheduledpowercutemail(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

// send ongoing powercut email notification
router.post('/send-ongoing-powercut-email', function (req, res, next) {
  MainNotification.ongoingpowercutemail(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

// send ticket create email notification
router.post('/send-ticket-create-email-notification', function (req, res, next) {
  MainNotification.ticketcreate(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

// send ticket status change email notification
router.post('/send-ticket-status-change-email-notification', function (req, res, next) {
  MainNotification.ticketstatus(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})


//password reset instructions
router.post('/forgot-password', function (req, res, next) {
  MainNotification.forgotpassword(req, next, function (err, data) { //console.log(err,data)
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//password change confirmation
router.post('/confirm-password-change', function (req, res, next) {
  MainNotification.confirmchange(req, next, function (err, data) { //console.log(err,data)
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})