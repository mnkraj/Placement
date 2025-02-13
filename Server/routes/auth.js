// routes/auth.js
const express = require('express');
const passport = require('passport');
const loggedin = require("../Middleware/Authmiddleware")
const router = express.Router();

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Callback route for Google to redirect to
router.get('/google/callback', passport.authenticate('google',{
    session: true // Ensure session is enabled
}), (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}`) // Redirect to your desired route after login
});
router.get('/profile',loggedin , (req, res) => {
    res.send({success : true , data : req.user})
}
);


router.get('/logout', loggedin, (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy((err) => {  // Ensure session is destroyed
            if (err) return next(err);
            res.clearCookie('connect.sid'); // Clear session cookie
            return res.json({ success: true, message: "User Logged Out Successfully" });
        });
    });
});


module.exports = router;