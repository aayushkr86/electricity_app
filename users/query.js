var Users = require('../models/usersmodel')
var ObjectId = require('mongodb').ObjectID
var bcrypt = require('bcrypt')
// var assert = require('assert')

exports.users = function (param, next, callback) {
  Users.find(param , function (err, users) {
    if (err) {
      callback(err, users)
    } else {
      callback(null, users)
    }
  }).catch(next)
}

exports.create = function (req, param, next, callback) {  
  Users.findOne({'username': param.username}).exec(function (err,username) {
    if(username == null && !err){
      Users.findOne({'email': param.email}).exec(function (err,email) {
        if(email == null && !err){
          Users.findOne({'mobileno': param.mobileno}).exec(function (err,mobileno) {
            if(mobileno == null && !err){
              Users.create(param).then(function (user) {
                req.session['userId'] = user._id;
                callback(null, user)
              }).catch(next)
            }else{
              callback(err, "mobileno already exists")
            }
          })          
        }else{
        callback(err, "email already exists")
        }  
      })
    }else{
      callback(err, "username already taken")
    }    
  })  
}


exports.login = function (req, param, next, callback) {  
  var query = {$or: [{"username":param.username}, {"email":param.email}]}                 
  Users.findOne( query ).exec( function (err, user) { 
    if (user != null && !err) {
      bcrypt.compare(param.password, user.password, function (err, result) {
        if( result === true && !err ){
          req.session['userId'] = user._id;          
          callback(null, user)
        } else {
          callback(err, "password doesnt match")
        }        
      })      
    } else {
      callback(err, "no user found")
    }
  })
}

exports.view = function (param, next, callback) { 
  Users.findById(param,function (err, users) {
    if (err) {
      callback(err, users )
    } else {
      callback(null, users)
    }
  })
}
//old
// exports.update = function (param, next, callback) {
//   Users.findOneAndUpdate({"username":param.username},
//     {$set:{param}}
//     ,function (err, users) { console.log(users)
//     if (err) {
//       callback(err, users )
//     } else {
//       callback(null, users)
//     }
//   })
// }

exports.update = function (req,param, next, callback) { //console.log(param)
   //console.log(req.user)
  Users.findOne({'account':  param.account}).exec(function (err,account) {  //console.log(account.account)
    if(account == null || account.account == req.user.account){ 

      Users.findOne({'mobileno': param.mobileno}).exec(function (err,mobileno) {
        if(mobileno == null || mobileno.mobileno == req.user.mobileno){

          var query = {$or: [{ 'google.email': param.email },{ 'facebook.email': param.email },{ 'local.email':param.email }]}
          Users.findOneAndUpdate(query,{$set:param}
            ,{new: true, runValidators: true}).then(function (users) { //console.log(users)
              callback(null, users)
          }).catch(next)

        }else{
          callback(true, "mobileno. already taken")
        }
      })       
    }else{
      callback(true, "accountno. already taken")
    }                          
})
}


exports.isuser = function (param, next, callback) { 
  var query = {$or: [{ 'google.email': param.email },{ 'facebook.email': param.email },{ 'local.email': param.email }]}
  Users.findOne(query).then( function (users) { 
      callback(null, users)
  }).catch(next)
}

exports.feederlist = function (param, next, callback) { //console.log(param)
  var query = {"powerFeeder":param.powerFeeder}
  Users.find(query , function (err, users) { //console.log(users)
    if (err) {
      callback(err, users)
    } else {
      callback(null, users)
    }
  }).catch(next)
}

exports.islocaluser = function (param, next, callback) { 
  var query = { 'local.email': param.email }
  Users.findOne(query).then( function (users) { //console.log(users)
      callback(null, users)
  }).catch(next)
}

//resetPasswordToken insertion
exports.resetPasswordToken = function (param, next, callback) { 
  var query = { 'local.email': param.email }
  Users.findOneAndUpdate(query,{$set:param}
    ,{new: true, runValidators: true}).then(function (users) { //console.log(users)
      callback(null, users)  
  }).catch(next)
}

exports.checkreset = function (param, next, callback) { 
  Users.findOne(param).then( function (token) { //console.log(token)
      callback(null, token)
  }).catch(next)
}

exports.updatepassword = function (param, next, callback) { //console.log(param)
  var query = { 'local.email':param.email }
  Users.findOneAndUpdate(query,
    {$set:{
      'local.password': param.password,
      'resetPasswordExpires': param.resetPasswordExpires,
      'resetPasswordToken' : param.resetPasswordToken,
    }}
    ,{new: true, runValidators: true}).then(function (password) { //console.log(password)
      callback(null, password)  
  }).catch(next)
}