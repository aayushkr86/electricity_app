var OperationalComands = require('./OperationalComands')

exports.getallusers = function (req, next, callback) {
    OperationalComands.getallusers(req, next, function (err, users) {
      callback(err, users)
    })
}

exports.signup = function (req, next, callback) {
    OperationalComands.signup(req, next, function (err, users) {
      callback(err, users)
    })
}

exports.loginuser = function (req, next, callback) {
  OperationalComands.loginuser(req, next, function (err, users) {
    callback(err, users)
  })
}

exports.profileview = function (req, next, callback) {
  OperationalComands.profileview(req, next, function (err, users) {
    callback(err, users)
  })
}

exports.logout = function (req, next, callback) {
  OperationalComands.logout(req, next, function (err, users) {
    callback(err, users)
  })
}

exports.updateuser = function (req, next, callback) { //console.log(req.user.email)
  if(req.user.email != req.body.email){ //check if same user is logged in
    return callback(true, null)
  }
  OperationalComands.updateuser(req, next, function (err, users) {
    callback(err, users)
  })
}

exports.isuser = function (req, next, callback) {
  OperationalComands.isuser(req, next, function (err, users) {
    callback(err, users)
  })
}

exports.feederlist = function (req, next, callback) {
  OperationalComands.feederlist(req, next, function (err, users) {
    callback(err, users)
  })
}

exports.forgot = function (req, next, callback) {
  OperationalComands.forgot(req, next, function (err, users) {
    callback(err, users)
  })  
}

exports.checkreset = function (req, next, callback) {
  OperationalComands.checkreset(req, next, function (err, token) {
    callback(err, token)
  })  
}

exports.resetpassword = function (req, next, callback) {
  OperationalComands.resetpassword(req, next, function (err, token) {
    callback(err, token)
  })  
}