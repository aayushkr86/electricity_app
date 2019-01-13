var express = require('express')
var router = express.Router()
var MainPowercut = require('./MainPowercut')

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

// schedule powercut api
router.post('/schedule-powercut', function (req, res, next) {
  MainPowercut.schedule(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})
// get all powercuts details
router.get('/Allpowercuts', function (req, res, next) {
  MainPowercut.allpowercuts(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//change powercut status
router.post('/change-status', function (req, res, next) {
  MainPowercut.change(req, next, function (err, data) { 
    if (err) {
      response(res, 400, err, [])
    } else if(data == "please provide valid details"){
     response(res, 400, err, data)
    } else if(data == null){
       data = 'no details found'
      response(res, 400, err, data)
    }else {
      response(res, 200, null, data)
    }
  })
})

//get ongoing powercuts details
router.get('/ongoing-powercuts', function (req, res, next) {
  MainPowercut.ongoing(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//get passed powercuts details
router.get('/passed-powercuts', function (req, res, next) {
  MainPowercut.passed(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

//get scheduled powercuts details
router.get('/scheduled-powercuts', function (req, res, next) {
  MainPowercut.scheduled(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})
