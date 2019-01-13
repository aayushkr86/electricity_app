var OperationalComands = require('./OperationalComands')

exports.createtickets = function (req, next, callback) {
    OperationalComands.createtickets(req, next, function (err, ticket) {
      callback(err, ticket)
    })
}

exports.getalltickets = function (req, next, callback) {
  OperationalComands.getalltickets(req, next, function (err, ticket) {
    callback(err, ticket)
  })
}

exports.getticket = function (req, next, callback) {
  OperationalComands.getticket(req, next, function (err, ticket) {
    callback(err, ticket)
  })
}

exports.picupload = function (req, next, callback) {
  OperationalComands.picupload(req, next, function (err, ticket) {
    callback(err, ticket)
  })
}

exports.ticketstatus = function (req, next, callback) {
  OperationalComands.ticketstatus(req, next, function (err, ticket) {
    callback(err, ticket)
  })
}