const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const loggedin = require("../Middleware/Authmiddleware");
const router = express.Router();

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = req.user.token;

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect(`${process.env.FRONTEND_URL}`);
});

// Get user profile
router.get('/profile', loggedin, (req, res) => {
    res.json({ success: true, data: req.user });
    // console.log(req.user)
});

// Logout user
router.get('/logout',loggedin, (req, res) => {
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
    res.json({ success: true, message: "User Logged Out Successfully" });
});

module.exports = router;
