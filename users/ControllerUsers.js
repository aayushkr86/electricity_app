var express = require('express')
var router = express.Router()
var MainUsers = require('./MainUsers')
var loginvalidator = require('../utils/loginvalidator')
var passloginvalidator = require('../passport/pass_loginvalidator')
var passport = require('passport')

module.exports = router

// response handler
function response (res,statuscode,err,data) { //console.log(statuscode,err,data)
  if (statuscode === 200) {
    var data = data;
  }else if(statuscode === 400){ 
    if(data == [] || data.length==0){
      data = "Bad request";
    }
  }else{
    data = "something went wrong";
  }
  res.status(statuscode).json({ "message": data });
}

// user list api
router.get('/user-list', function (req, res, next) {
  MainUsers.getallusers(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else {
      response(res, 200, null, data)
    }
  })
})

// sign up api
router.post('/signup', function (req, res, next) {  
    if (req.body.firstname && req.body.email && req.body.username && req.body.password && req.body.passwordconfirm) { 
      if(req.body.password == req.body.passwordconfirm){
        MainUsers.signup(req, next, function (err, data) {
          console.log(err, data)
          if (err) {
          response(res, 400, err, [])
          } else {
          response(res, 200, null, data)
          }
        })
      }else{
        var message = 'password doesnt match'
        response(res, 400, null, message)
      }
    }else{
      var message = 'firstname,email,username,password & passwordconfirm fields are required'
      response(res, 400, null, message)
    } 
})

// login api
router.post('/login', function (req, res, next) {
  if ((req.body.email || req.body.username) && req.body.password) {
    MainUsers.loginuser(req, next, function (err, data) {
      if (err) {
      response(res, 400, err, [])
      } else {
      response(res, 200, null, data)
      }
    })
  }else{
     response(res, 400, null, data)
  }  
})

// logout api
router.get('/logout', loginvalidator.isAuthenticated, function (req, res, next) {
  MainUsers.logout(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, data)
    } else {
      response(res, 200, null, data)
    }
  })
});

//update profile api
router.post('/update-profile',passloginvalidator.isLoggedIn, function (req, res, next) {       
  MainUsers.updateuser(req, next, function (err, data) {
    // console.log(err, data)
    if (err && data) {
      response(res, 400, err, data)
    } 
    else if(err){
      response(res, 400, err, [])
    }else {
      response(res, 200, null, data)
    }
  })  
})

// current profile api (after registering)
router.get('/profile', passloginvalidator.isLoggedIn, function (req, res, next) {     
  // console.log(req.session) 
  //console.log(req.user)
  MainUsers.profileview(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, data)
    } else {
      response(res, 200, null, data)
    }
  })
})

//google login api
router.get('/auth/google', passport.authenticate('google', { authType: 'rerequest', scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/auth/google/redirect',passport.authenticate('google', {
                successRedirect : '/user/profile',
                failureRedirect : '/',
                failureFlash: true,
                
       }));

//facebook login api
router.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest', scope : ['profile', 'email'] }));

//facebook redirect api
router.get('/auth/facebook/redirect', passport.authenticate('facebook', {
                                      successRedirect : '/user/profile',
                                      failureRedirect : '/',
                                      failureFlash: true,
}));
     
//local signup api
router.post('/passport-signup', passport.authenticate('local-signup', {
                                successRedirect : '/user/profile',
                                failureRedirect : '/', 
                                failureFlash : true 
}));

//local signin api
router.post('/passport-login', passport.authenticate('local-login', {
                                successRedirect : '/user/profile', 
                                failureRedirect : '/', 
                                failureFlash : true 
})); 

//logout api
router.get('/passport-logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// check if user exists
router.post('/is-user', function (req, res, next) { 
  MainUsers.isuser(req, next, function (err, data) {     
    if (err) { console.log(err)
      response(res, 400, err, {})
    } else if (data == null) {
      data = "no user found"
      response(res, 400, null, data)
    } else { 
      response(res, 200, null, data)
    }
  })
})

//feeder list
router.post('/feeder-list', function (req, res, next) { 
  MainUsers.feederlist(req, next, function (err, data) {     
    if (err) { console.log(err)
      response(res, 400, err, {})
    } else if (data == null || data.length == 0 ) {
      data = "no user found"
      response(res, 400, null, data)
    } else { 
      response(res, 200, null, data)
    }
  })
})

//forgot password
router.post('/forgot-password', passloginvalidator.notLoggedIn, function (req, res, next) {
  MainUsers.forgot(req, next, function (err, data) {    //console.log(err,data)     
    if (err && data == null) { //console.log(err)
      response(res, 400, err, [])
    } else if (err && data == "error in sending email") {
      response(res, 400, null, data)
    } else if (data == null) {
      data = "no user found"
      response(res, 400, null, data)
    } else { 
      response(res, 200, null, data)
    }
  })
})

//check reset Password Token 
router.get('/reset/:token', passloginvalidator.notLoggedIn, function (req, res, next) { //console.log(req.params)
  MainUsers.checkreset(req, next, function (err, data) {
    if (err) {
      response(res, 400, err, [])
    } else if (data == null) {
      data = "Password reset token is invalid or has expired.";
      response(res, 400, null, data)
    } else {
      response(res, 200, null, data)
    }
  })
})

//reset password api 
router.post('/reset/:token', passloginvalidator.notLoggedIn, function (req, res, next) { //console.log(req.params)
  MainUsers.resetpassword(req, next, function (err, data) {
    if (err && data == null) {
      response(res, 400, err, [])
    } else if (data == "Password reset token is invalid or has expired.") {
      response(res, 400, null, data)
    } else if (data == "error in sending email but password has been changed.") {
      response(res, 400, null, data)
    } else {
      response(res, 200, null, data)
    }
  })
})