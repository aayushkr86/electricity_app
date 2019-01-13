var FacebookStrategy = require('passport-facebook').Strategy
var passport = require('passport')



var Users = require('../models/usersmodel')
var configAuth = require('../utils/config')
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {
     console.log("profile",profile)

        process.nextTick(function() {
            var query = {$or: [{ 'facebook.id': profile.id },{ 'local.email': profile.emails[0].value }]}
            Users.findOne(query).then(function(fbusers){
                     
                    if(user){console.log('user found')
                        if (user.facebook.id == undefined) {

                            var param = {
                                'id'           : profile.id,
                                'token'        : token,
                                'displayName'  : profile.displayName,
                                'firstname'    : profile.name.givenName,
                                'email'        : profile.emails[0].value,
                                'lastname'     : profile.name.familyName,
                                'photos'       : profile.photos.value,
                                'gender'       : profile.gender,
                                'provider'     : profile.provider
                            }
                            var query = { 'email': profile.emails[0].value }
                        
                            Users.findOneAndUpdate(query,{$set: { "facebook" : param }},{new: true},function (fbuser) { 
                                if(err){
                                    return done(err)
                                 }
                            return done(null, fbuser);
                                                                        
                            })
                        }

                        return done(null, user,{message:'email already in use'});
                    }
                    else{ console.log('user not found') 
                    var newUser    = new Users({
                        'id'           : profile.id,
                        'token'        : token,
                        'displayName'  : profile.displayName,
                        'email'        : profile.emails[0].value,
                        'firstname'    : profile.name.givenName,
                        'lastname'     : profile.name.familyName,
                        'photos'       : profile.photos.value,
                        'gender'       : profile.gender,
                        'provider'     : profile.provider
    
                        }).save(function(err,fbuser) {
                            if (err){
                                return  done(err)
                            }                        
                            return done(null, fbuser);
                        })
                    }
            })
               
        });

    }));
