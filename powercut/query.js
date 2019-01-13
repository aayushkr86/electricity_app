var Powercut = require('../models/powercutmodel')
var Users   = require('../users/index')

exports.powercut = function (req,param, next, callback) {  
        Powercut.create(param).then(function (powercut) { 
          callback(null, powercut)
        }).catch(next)  
}

exports.getAll = function (req,param, next, callback) {  
        Powercut.find(param).then(function (powercuts) { 
          callback(null, powercuts)
        }).catch(next)
}

exports.statuschange = function (req,param, next, callback) {  
  var query = {'_id':param._id}
  Powercut.findByIdAndUpdate(query,{$set:{'status':param.status}},
  {new: true, runValidators: true}).then(function (powercut) { 
    callback(null, powercut)
  }).catch(next)
}

exports.ongoing = function (req,param, next, callback) {  
  Powercut.findOne(param).exec(function (err,powercuts) { 
    if(err){
      callback(null, powercuts)
    }
    callback(null, powercuts)
  })
}

exports.passed = function (req,param, next, callback) {  
  Powercut.find(param).then(function (powercuts) { 
    callback(null, powercuts)
  }).catch(next)
}

exports.scheduled = function (req,param, next, callback) {  
  Powercut.find(param).then(function (powercuts) { 
    callback(null, powercuts)
  }).catch(next)
}