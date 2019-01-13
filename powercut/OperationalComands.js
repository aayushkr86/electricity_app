var query = require('./query')
var ObjectId = require('mongodb').ObjectID


exports.schedule = function (req, next, callback) {
    var param = {
              "from"   : req.body.from,
              "to"     : req.body.to,
              "state"  : req.body.state,
              "discom" : req.body.discom,
              "feeder" : req.body.feeder,             
              "status" : req.body.status        
    }
  query.powercut(req,param, next, function (err, powercut) {
    callback(err, powercut)
  })
}

exports.allpowercuts = function (req, next, callback) {
    var param = {}
    query.getAll(req,param, next, function (err, powercuts) {
    callback(err, powercuts)
  })
}

exports.change = function (req, next, callback) { 
    var param = {
      "_id": ObjectId(req.body._id),
      "status": req.body.status
    }
    query.statuschange(req,param, next, function (err, powercut) {
    callback(err, powercut)
  })
}

exports.ongoing = function (req, next, callback) {
  var param = {
    'status' : 1
  }
  query.ongoing(req,param, next, function (err, powercuts) {
  callback(err, powercuts)
})
}

exports.passed = function (req, next, callback) {
  var param = {
    'status' : 2
  }
  query.passed(req,param, next, function (err, powercuts) {
  callback(err, powercuts)
})
}

exports.scheduled = function (req, next, callback) {
  var param = {
    'status' : 0
  }
  query.scheduled(req,param, next, function (err, powercuts) {
  callback(err, powercuts)
})
}


