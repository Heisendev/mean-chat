var User = require('mongoose').model('User'),
  passport = require('passport');

var getErrorMessage = function(err){
  var message = '';

  if(err.code){
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for(var errName in err.errors) {
      if(err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
}

exports.renderSignin = function(req, res, next){
  if(!req.user) {
    res.render('signin', {
      title: 'Signin Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
};

exports.renderSignup = function(req, res, next){
  if(!req.user){
    res.render('signup', {
      title: 'Signup Form',
      messages: req.flash('error')
    });
  } else {
    return res.redirect('/');
  }
};

exports.signup = function(req, res, next){
  if(!req.user){
    console.log('new user body == ', req.body);
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';

    user.save(function(err){
      if(err){
        var message = getErrorMessage(err);
        req.flash('error', message);
        return res.redirect('/signup');
      }
      req.login(user, function(err){
        if(err) return next(err);
        return res.json(user);
      });
    });
  } else {
    return res.redirect('/');
  }
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.saveOAuthUserProfile = function(req, profile, done){
  User.findOne({
    provider: profile.provider,
    providerId: profile.providerId
  }, function(err, user){
    if(err){
      return done(err);
    } else{
      if(!user){
        var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

        User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
          profile.username = availableUsername;
          console.log('twitter profile ==== ', profile);
          user = new User(profile);

          user.save(function(err){
            return done(err, user);
          });
        });
      } else {
        return done(err, user);
      }
    }
  });
};

exports.requiresLogin = function(req, res, next){
  if(!req.isAuthenticated()){
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }
  next();
};

exports.list = function(req, res){
  User.find().sort('-username').exec(function(err, users){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(users);
    }
  });
};

exports.read = function(req, res){
  res.json(req.userFound);
};

exports.update = function(req, res){
  var user = req.user;
  user.username = req.body.username;
  user.lastName = req.body.lastName;
  user.firstName = req.body.firstName;
  user.email = req.body.email;
  user.color = req.body.color;

  user.save(function(err){
    if(err){
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(user);
    }
  });
};


exports.userByID = function(req, res, next, id){
  User.findById(id).exec(function(err, user){
    if(err) return next(err);
    if(!user) return next(new Error('Failed to load article' + id));
    req.userFound = user;
    console.log(user);
    next();
  });
};

exports.hasAuthorization = function(req, res, next){
  console.log(req.userFound.id === req.user.id);
  console.log(req.user.role === 'Admin');
  if((req.user.role != 'Admin') && (req.userFound.id !== req.user.id)){
    return res.status(403).send({
      message: 'User is not authorized'
    });
  }
  next();
};