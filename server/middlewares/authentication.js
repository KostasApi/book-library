const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
// We use this to extract the JWT sent by the user
const ExtractJWT = require("passport-jwt").ExtractJwt;

const ErrorResponse = require("../utils/errorResponse");
const UserModel = require("../models/User.model");

// Create a passport middleware to handle user registration
passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
          // User not exists - proceed
          return done(null, true);
        }

        // User exists - return error
        return done(new ErrorResponse(`Email: ${email}, already used`, 400));
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Create a passport middleware to handle user login
passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find the user associated with the email provided by the user
        const user = await UserModel.findOne({ email }).select("password");
        if (!user) {
          // If the user isn't found in the database, return an error
          return done(new ErrorResponse(`Invalid credentials`, 404), false);
        }
        // Validate password and make sure it matches
        // with the corresponding hash stored in the database.
        // If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
          // If password don't match return an error
          return done(new ErrorResponse(`Invalid credentials`, 404), false);
        }
        // Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      // secret we used to sign our JWT
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        const user = await UserModel.findOne(payload.user);
        if (!user) {
          // If the user isn't found in the database, return an error
          return done(new ErrorResponse(`Invalid credentials`, 404), false);
        }
        // Pass the user details to the next middleware
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
