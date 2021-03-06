var passport = require('passport'),
  url = require('url'),
  FacebookStrategy = require('passport-facebook').Strategy,
  config = require('../config'),
  users = require('../../app/controllers/users.server.controller');

module.exports = function(){
  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    passReqToCallback: true,
    profileFields: ['id', 'name', 'displayName', 'link', 'photos', 'email']
  },
  function(req, accessToken, refreshToken, profile, done){
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    console.log('profile == ', arguments);
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      fullName: profile.displayName,
      email: profile.emails ? profile.emails[0].value : 'hermet.mkl+test-'+firstName+'@gmail.com',
      username: profile.username,
      provider: 'facebook',
      providerId: profile.id,
      providerData: providerData
    };

    users.saveOAuthUserProfile(req, providerUserProfile, done);
  }));
};
