var query = require('./query')
var ObjectId = require('mongodb').ObjectID


exports.createtickets = function (req, next, callback) {//console.log(req.user)
    var param = {
              "account":req.user.account,
              "email":req.user.email,
              "mobileno":req.user.mobileno,
              "discom":req.user.discom,
              "state":req.user.state,
              "powerFeeder":req.user.powerFeeder,              
              "title": req.body.title,
              "description":req.body.description,
              "photos":req.body.photos,
              "status":req.body.status,
    }
  query.create(req,param, next, function (err, ticket) {
    callback(err, ticket)
  })
}

exports.getalltickets = function (req, next, callback) {
      var param = {}
      query.alltickets(req,param, next, function (err, ticket) {
      callback(err, ticket)
      })
}

exports.getticket = function (req, next, callback) {
  var param = {
    'email' : req.body.email,
    'account' : req.body.account,
    'mobileno' : req.body.mobileno,
  }
  query.ticket(param, next, function (err, ticket) {
  callback(err, ticket)
  })
}

//pic upload
exports.picupload = function (req, next, callback) {
  var param = {
   '_id' : req.body._id,
   'photos' :req.file.path
  }
  query.upload(param, next, function (err, ticket) {
  callback(err, ticket)
  })
}

//change status
exports.ticketstatus = function (req, next, callback) {
  var param = {
   '_id'    : req.body._id,
   'status' : req.body.status
  }
  query.statuschange(req, param, next, function (err, ticket) {
  callback(err, ticket)
  })
}