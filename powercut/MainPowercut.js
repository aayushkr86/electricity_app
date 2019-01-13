var OperationalComands = require('./OperationalComands')

exports.schedule = function (req, next, callback) {
    OperationalComands.schedule(req, next, function (err, powercut) {
      callback(err, powercut)
    })
}

exports.allpowercuts = function (req, next, callback) {
  OperationalComands.allpowercuts(req, next, function (err, powercuts) {
    callback(err, powercuts)
  })
}

exports.change = function (req, next, callback) { 
  var status = JSON.stringify(req.body.status) 
  if(req.body.status &&  status.match(/[0,1,2]/)  && req.body._id){ 
      OperationalComands.change(req, next, function (err, powercut) {
        callback(err, powercut)
      })
  }
  else{
  powercut = 'please provide valid details'
  callback(null, powercut)
  }
}

exports.ongoing = function (req, next, callback) {
  OperationalComands.ongoing(req, next, function (err, powercuts) {
    callback(err, powercuts)
  })
}

exports.passed = function (req, next, callback) {
  OperationalComands.passed(req, next, function (err, powercuts) {
    callback(err, powercuts)
  })
}

exports.scheduled = function (req, next, callback) {
  OperationalComands.scheduled(req, next, function (err, powercuts) {
    callback(err, powercuts)
  })
}

