
exports.isLoggedIn = function (req, res, next) {    
    if (req.isAuthenticated())
        {
            return next();
        }
    // res.redirect('/');
    var err = new Error('You must be logged in !!!!!!');
    err.status = 401;
      next(err);
}

exports.notLoggedIn = function (req, res, next) {    
    if (!req.isAuthenticated())
        {
            return next();
        }
    // res.redirect('/');
    var err = new Error('User already logged in !!!!!!');
    err.status = 401;
      next(err);
}
