var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user').User;
var constants = require('../libraries/constants');

passport.use(new LocalStrategy({
    usernameField: 'emailAddress'
  },
  function(username, password, done) {
    User.findOne({ emailAddress: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: constants.constUserWasNotFound
        });
      }
      
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: constants.constUserPasswordIsNotCorrect
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));