var Tickets = require('../models/ticketmodel')
var Users   = require('../users/index')
var notification = require('../notification/index')
var ObjectId = require('mongodb').ObjectID

exports.create = function (req,param, next, callback) { 
  req.body['email'] = req.user.email
  Users.isuser(req,next,function(err,users){ 
    if (users != 'no user found' && !err) { 
        Tickets.create(param).then(function (tickets) { 
          req.body['tickets']= tickets
          notification.ticketcreate(req,next,function(err,notification){ //email notification
            callback(null, tickets)
          })
          }).catch(next)
    }else{
      callback(err, "no user found")
    }
  }) 
}

exports.alltickets = function (req,param, next, callback) {   
        Tickets.find(param).then(function (tickets) { 
              callback(null, tickets)
          }).catch(next)
}

exports.ticket = function (param, next, callback) {   
  var query = {$or: [{ 'email': param.email },{ 'account': param.account },{ 'mobileno': param.mobileno }]}
  Tickets.find(query).then(function (tickets) { 
        callback(null, tickets)
    }).catch(next)
}

exports.upload = function (param, next, callback) {
  var query = {'_id':param._id}
  Tickets.findByIdAndUpdate(query,{$set:{'photos':param.photos}},
  {new: true, runValidators: true}).then(function (photos) { //console.log(photos)
    callback(null, photos)
  }).catch(next)
}

exports.statuschange = function (req, param, next, callback) { 
  var query = {'_id':param._id}
  Tickets.findByIdAndUpdate(query,{$set:{'status':param.status}},
  {new: true, runValidators: true}).then(function (status) { //console.log(status)
      req.body['status'] = status
      notification.ticketstatus(req,next,function(err,notification){ //email notification
         callback(null, status)
      }) 
  }).catch(next)
}