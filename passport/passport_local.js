var LocalStrategy   = require('passport-local').Strategy
var passport = require('passport')
var bcrypt = require('bcrypt')
var Users = require('../models/usersmodel')


passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        done(err, user);
    });
})


// passport signup
passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) {

// console.log(req.body, email, password)
    process.nextTick(function() {

    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Minimum eight characters, at least one letter, one number and one special character')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(errors.msg);
        })
        return done(errors,messages)
    } 
    


   var query = {$or: [{ 'google.email': email },{ 'facebook.email': email }]}
   Users.findOne(query, function(err, social) { //console.log("google",social)
    if(social){
        Users.findOne({ 'local.email' :  email }, function(err, user) {
            if(user){
// console.log(user)
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }else{
                var encruptPassword =   function () { 
                                        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                                        };

                Users.findOneAndUpdate(query,{$set:{ 'local.email':email,'local.password':encruptPassword(password) }},{new: true}
                , function(err, newUser){
                    if(err){
                        return done(err)
                    }else{
                        return done(null, newUser);
                    }
                })   
            }
        
        
        })            
         
    }else{
            Users.findOne({ 'local.email' :  email }, function(err, user) {
                    // console.log(email, password);
                    //console.log(user)
                    if (err)
                        return done(err);

                    
                    if (user) {
                        //return done(null,'That email is already taken.');
                         return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        
                        var newUser            = new Users();
                        newUser.local ={};
                        newUser.local.email    = email;
                        newUser.local.password = password;
                        newUser.save(function(err,newUser) { //console.log("err",err,"newUser",newUser)
                            if (err)
                                // throw err;
                                return done(err)
                            return done(null, newUser);
                        });
                    }

                }); 
        }
   })
       

    }); //process.nextTick

}));

// passport signin
passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true 
},
function(req, email, password, done) { 
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty().isLength({min:8});
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(errors.msg);
        })
        return done(errors,messages)
    }    
    Users.findOne({ 'local.email' :  email }, function(err, user) { //console.log(user)      
        if (err)
            return done(err);   
        if (!user) 
             return done(null, false, req.flash('loginMessage', 'No user found.')); 
            //return done(null,'no user found')             
        if (!user.validPassword(password))
             return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
            //return done(null,'wrong password')
            
            //return successful user
        return done(null, user);
    });
}));

