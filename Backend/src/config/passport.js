const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const userModel = require('../models/user.model');
const config = require('./config');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user already exists with this Google ID
      let user = await userModel.findOne({ googleId: profile.id });
      if (user) {
        user.authMessage = "user logged in successfully";
        return done(null, user);
      }

      // 2. Check if user exists with the same email
      user = await userModel.findOne({ email: profile.emails[0].value });
      if (user) {
        // Link Google ID to existing account
        user.googleId = profile.id;
        
        // Update profile picture if user doesn't have one and google provides one
        if (!user.profilePicture && profile.photos && profile.photos.length > 0) {
          user.profilePicture = profile.photos[0].value;
        }
        await user.save();
        
        user.authMessage = "user logged in successfully";
        return done(null, user);
      }

      // 3. Create a new user
      // Generate a unique username since it's marked as required in the schema
      const uniqueUsername = profile.displayName.replace(/\s+/g, '').toLowerCase();
      let usernameExists = await userModel.findOne({ username: uniqueUsername });
      
      if(usernameExists){
        return done(null, false, { message: "Username already exists" });
      }

      user = await userModel.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        fullname: profile.displayName,
        username: uniqueUsername,
        profilePicture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : "",
      });

      user.authMessage = "user registered successfully";
      return done(null, user);
    } catch (error) {
      console.log("Error in passport callback:", error);
      return done(error, null);
    }
  }));
};
