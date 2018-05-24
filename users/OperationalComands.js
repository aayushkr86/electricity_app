var query = require('./query')
var ObjectId = require('mongodb').ObjectID
var notification = require('../notification/index')
var async = require('async')
var bcrypt = require('bcrypt')


exports.getallusers = function (req, next, callback) {
  var param = {}
  query.users(param, next, function (err, users) {
    callback(err, users)
  })
}

exports.signup = function (req, next, callback) {  
  var param = {
    'username' : req.body.username,
    'firstname': req.body.firstname,
    'middlename' : req.body.middlename,
    'lastname': req.body.lastname,
    'email': req.body.email,
    'mobileno': req.body.mobileno,
    'password' :req.body.password, 
    'occupation': req.body.occupation,
    'city': req.body.city,
    'pin': req.body.pin,
  }
  query.create(req, param, next, function (err, users) {
    callback(err, users)
  })
}

exports.loginuser = function (req, next, callback) {
  var param = {
    'username' : req.body.username,
    'email': req.body.email,
    'password' :req.body.password, 
  }
  query.login(req, param, next, function (err, users) {
    callback(err, users)
  })
}

exports.profileview = function (req, next, callback) { 
  
  var param = req.user
  //req.session.userId
  query.view(param, next, function (err, users) {
    callback(err, users)
  })
}

exports.logout = function (req, next, callback) { 
  if (req.session) {
    req.session.regenerate(function (err) {
      if (err) {
        next(err);
      } else {
        callback(err, "loged out")  
      }
    });
  }   
}
//old
// exports.updateuser = function (req, next, callback) {  
//   var param = {
//     'username' : req.body.username,
//     'firstname': req.body.firstname,
//     'middlename' : req.body.middlename,
//     'lastname': req.body.lastname,
//     'email': req.body.email,
//     'mobileno': req.body.mobileno,
//     'password' :req.body.password, 
//     'occupation': req.body.occupation,
//     'city': req.body.city,
//     'pin': req.body.pin,
//   }
//   query.update(param, next, function (err, users) {
//     callback(err, users)
//   })
// }

exports.updateuser = function (req, next, callback) {  
  var param = {
    'account' : req.body.account,
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'email': req.body.email,
    'mobileno': req.body.mobileno,
    'occupation': req.body.occupation,
    'state': req.body.state,
    'discom': req.body.discom,
    'city': req.body.city,
    'powerFeeder': req.body.powerFeeder,
    'pin': req.body.pin,
    'gender': req.body.gender,
    'notification': req.body.notification
  }
  query.update(req, param, next, function (err, users) {
    callback(err, users)
  })
}


exports.isuser =function (req,next,callback) { 
  var param = {
        "email":req.body.email
  }
  query.isuser(param,next, function (err, users) {
    callback(err, users)
  })
}

exports.feederlist =function (req,next,callback) { //console.log(req.body)
  var param = {
        "powerFeeder":req.body.feeder
  }
  query.feederlist(param,next, function (err, users) {
    callback(err, users)
  })
}

//forgot password
exports.forgot =function (req,next,callback) { //console.log(req.body)
  var param = {
        "email":req.body.email
  }
  query.islocaluser(param,next, function (err, users) { //console.log(users)
    if (users && !err) {       
      
      function generateToken() {
        var buf = new Buffer(16);
        for (var i = 0; i < buf.length; i++) {
            buf[i] = Math.floor(Math.random() * 256);
        }
        var id = buf.toString('base64');            
        id = id.replace(new RegExp('/','g'), ''); 
        return id;
      }
      var param = {
        "email" : users.local.email ,
        "resetPasswordToken" : generateToken(),
        "resetPasswordExpires" : Date.now() + 60 * 60 * 1000 //Expires in 1 hr
      }
      query.resetPasswordToken(param,next, function (err, token) {  //update user db with resetPasswordToken
        req.body['token'] = token
        notification.forgotpassword(req,next,function(err,email) {  // send email for password reset instructions
          if(err || email.length == 0){            
             return callback(true,"error in sending email")
           }
           callback(err, "Please check your email for further instructions.")
        })        
      })   
    }else {
      callback(err, users)
    }  
  })
}

//reset password token check
exports.checkreset =function (req,next,callback) { //console.log(req.params.token)
  var param = {
        "resetPasswordToken":req.params.token,
        "resetPasswordExpires": { $gt: Date.now() }
  }
  query.checkreset(param,next, function (err, token) {
    callback(err, token)
  })
}

//reset password 
exports.resetpassword =function (req,next,callback) { //console.log(req.params.token)

function encruptPassword (password) { 
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

  async.waterfall([
    function(done){
      var param = {
          "resetPasswordToken" : req.params.token,
          "resetPasswordExpires" : { $gt: Date.now() }
      }
      query.checkreset(param,next, function(err,user){ //console.log(!user)
        if(!user){
         return done(true,"Password reset token is invalid or has expired.")
        }        
        var param = {
          "email" : user.local.email,          
          "password" : encruptPassword(req.body.password),
          "resetPasswordToken" : undefined,
          "resetPasswordExpires" : undefined,
        };        
        query.updatepassword(param,next,function(err,password) { 
          req.logIn(user, function(err) {//login user
            done(err, user);
          })
        })
      })
    },
    function(user,done) {
      req.body['email'] = user.local.email
      notification.confirmchange(req,next,function(err,email) {  // send email for password reset instructions
        // console.log(err,email)
        if (err || email.length == 0) {               
         return done(true,"error in sending email but password has been changed.")
        }
        callback(null, "Success! Your password has been changed and confirmation mail send.")
      })  
    }
  ],function(err,data) { 
    callback(false,data)
  })
}