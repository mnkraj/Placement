const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.DEPLOYED_URL}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if(!profile.emails[0].value.endsWith("@nitjsr.ac.in")) return done(null , false , {message : "Only nitjsr Emails are allowed to Log In"})
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await new User({
                email: profile.emails[0].value,
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value,
            }).save();
        }

        // 🛠 Include more details in the JWT
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            displayName: user.displayName,
            firstName: user.firstName,
            lastName: user.lastName,
            image: user.image
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return done(null, { user, token });
    } catch (error) {
        return done(error, false);
    }
}));
