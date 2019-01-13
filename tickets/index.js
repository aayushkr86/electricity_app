var ControllerUsers = require('./ControllerTickets')
var UserQuery = require('./query')
var request = require('request')

module.exports = function (req, res, next) {
  ControllerUsers(req, res, next)
}
