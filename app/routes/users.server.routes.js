
'use strict';


var users = require('../../app/controllers/users.server.controller'),
  passport = require('passport');


module.exports = function(app) {

  app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);


  app.route('/api/signin')
    .get(users.renderSignin)
    .post(function(req,res,next){
      passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.status(404).send({message: 'user not found'}); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.json(user);
        });
      })(req, res, next);
    });
    /*.post(passport.authenticate('local', {
      successRedirect: '/#!/chat/general',
      failureRedirect: '/#!/users/login',
      failureFlash: true
    }));*/


  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }));
  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));


  app.get('/oauth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }));
  app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));


  app.get('/oauth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    failureRedirect: '/signin'
  }));
  app.get('/oauth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));


  app.get('/signout', users.signout);

  app.route('/api/users')
    .get(users.requiresLogin, users.list)
    .post(users.signup);
  app.route('/api/users/:userId')
    .get(users.requiresLogin, users.hasAuthorization, users.read)
    .put(users.requiresLogin, users.hasAuthorization, users.update);

  app.param('userId', users.userByID);
};