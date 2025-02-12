const loggedin = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.json({success : false , message : "User Not Logged In"});
}

module.exports = loggedin;