var ControllerUsers = require('./ControllerUsers')
var UserQuery = require('./query')
var request = require('request')

module.exports = function (req, res, next) {
  ControllerUsers(req, res, next)
}

module.exports.isuser = function (req, next, callback) {  
  request({
    url: 'http://localhost:3000/user/is-user',
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
  }, function(err, users){ 
    //  console.log(users.body)
    callback(err, users.body.message)
  });
}

module.exports.feederlist = function (req, next, callback) {  //console.log(req.body)
  request({
    url: 'http://localhost:3000/user/feeder-list',
    method: 'POST',
    json: true,
    body:req.body,
    gzip: true
  }, function(err, users){ 
      // console.log(users.body)
    callback(err, users.body.message)
  });
}