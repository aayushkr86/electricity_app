// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy
var passport = require('passport')



var Users  = require('../models/usersmodel')
var configAuth = require('../utils/config')
    
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //google
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {
// console.log("token",token)
// console.log("refreshToken",refreshToken)
// console.log("profile",profile)

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            var query = {$or: [{ 'google.id': profile.id },{ 'local.email': profile.emails[0].value }]}
                Users.findOne(query, function(err, user) { //console.log("user",user)
                if (err)
                    return done(err);                   
                if (user) { console.log('user found')
                    //console.log(user.google.id)
                    if (user.google == undefined || user.google.length == 0) { //console.log("im here",user)
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
                    
                        var query = { 'local.email': profile.emails[0].value }
                                
                        Users.findOneAndUpdate(query,{$set:{ 'google' : param }},{new: true},function (err,user) { //console.log("err",err,"user",user)
                         if(err){
                            return done(err)
                         }
                        return done(null, user);
                                                                        
                        })
                    }
                    return done(null, user,{message:'email already in use'});
                } else {        console.log('user not found')            
                    var newUser    = new Users();
                    newUser.google = {}; 
                    newUser.google.id          = profile.id,
                    newUser.google.token       = token,
                    newUser.google.displayName = profile.displayName,
                    newUser.google.email       = profile.emails[0].value,
                    newUser.google.firstname   = profile.name.givenName,
                    newUser.google.lastname    = profile.name.familyName,
                    newUser.google.photos      = profile.photos.value,
                    newUser.google.gender      = profile.gender,
                    newUser.google.provider    = profile.provider

                    newUser.save(function(err,user) {
                        if (err){
                          return  done(err)
                        }                        
                        return done(null, user);
                    })
               
            }
            });
               
        });

    }));
