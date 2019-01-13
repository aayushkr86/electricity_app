var Powercut = require('../models/powercutmodel')
var User = require('../users/index')

exports.schedule = function (req, next, callback) {      
    var query = {$and:[{"status" : 0,"feeder": req.body.feeder}]}
        Powercut.find(query).then(function (powercuts) { //console.log(powercuts)
            if(powercuts.length > 0 ){            
                User.feederlist(req,next,function(err,users){
                    if(users != 'no user found' && !err){
                        var emails = [];
                        users.forEach(function(key,value){
                            emails.push(key.email)
                        });                    
                        callback( err,emails)
                    }else{
                        callback( err,'no user found')
                    }
                })            
            }else{
                callback( null,"no powerfeeder found")
            }        
        }).catch(next)
}


exports.ongoing = function (req, next, callback) {      
    var query = {$and:[{"status" : 1,"feeder": req.body.feeder}]}
        Powercut.find(query).then(function (powercuts) { //console.log(powercuts)
            if(powercuts.length > 0 ){            
                User.feederlist(req,next,function(err,users){
                    if(users != 'no user found' && !err){
                        var emails = [];
                        users.forEach(function(key,value){
                            emails.push(key.email)
                        });                    
                        callback( err,emails)
                    }else{
                        callback( err,'no user found')
                    }
                })            
            }else{
                callback( null,"no powerfeeder found")
            }        
        }).catch(next)
}