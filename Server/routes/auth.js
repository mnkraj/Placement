// routes/auth.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }
    res.send('You are logged in');
}
);

// Callback route for Google to redirect to
router.get("/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: info?.message || "Only Emails Associated with the institute are allowed to login." });
        }
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ success: false, message: "Login failed." });
            }
            return res.redirect(`/profile`);
        });
    })(req, res, next);
});


router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/'); // Redirect to home or login page
    });
});


module.exports = router;