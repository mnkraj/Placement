
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require("../models/User")
require('dotenv').config();

passport.serializeUser ((user, done) => {
    done(null, user.id);
});

passport.deserializeUser ((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(existingUser  => {
        const email = profile.emails[0].value;
        if (!email.endsWith("@nitjsr.ac.in")) {
            return done(null, false, { message: "Only NIT Jamshedpur emails are allowed." });
        }
        if (existingUser ) {
            done(null, existingUser );
        } else {
            new User({
                email: profile.emails[0].value,
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                image: profile.photos[0].value,
            })
            .save()
            .then(user => done(null, user));
        }
    });
}));