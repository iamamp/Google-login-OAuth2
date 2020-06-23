const passport = require('passport');

var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    //User.findById(id, function(err, user) {
      done(null, user);
    //});
  });

passport.use(new GoogleStrategy({
    clientID:     "187247726476-6kqtcb2u148n9q91m5bcr3rabh1uaou6.apps.googleusercontent.com",
    clientSecret: "D3GQBLMNSb4qTH_lEcc6inOz",
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    //});
  }
));

/*
187247726476-6kqtcb2u148n9q91m5bcr3rabh1uaou6.apps.googleusercontent.com
D3GQBLMNSb4qTH_lEcc6inOz
*/