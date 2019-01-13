var ControllerPowercut = require('./ControllerPowercut')
var UserQuery = require('./query')
var request = require('request')

module.exports = function (req, res, next) {
  ControllerPowercut(req, res, next)
}
