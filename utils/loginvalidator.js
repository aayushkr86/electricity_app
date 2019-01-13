exports.isAuthenticated = function (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
      var err = new Error('You must be logged in !!!!!!');
      err.status = 401;
        next(err);
    }
  }