
'use strict';


var users = require('../../app/controllers/users.server.controller'),
  passport = require('passport');


module.exports = function(app) {

  app.route('/signup')
    .get(users.renderSignup)
    .post(users.signup);


  app.route('/signin')
    .get(users.renderSignin)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/signin',
      failureFlash: true
    }));


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
    .get(users.requiresLogin, users.list);
  app.route('/api/users/:userId')
    .get(users.requiresLogin, users.hasAuthorization, users.read);

  app.param('userId', users.userByID);
};