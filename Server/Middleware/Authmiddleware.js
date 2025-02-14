const jwt = require("jsonwebtoken");

const loggedin = (req, res, next) => {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.json({ success: false, message: "User Not Logged In" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach full user data to request
        next();
    } catch (error) {
        return res.json({ success: false, message: "Invalid Token" });
    }
};

module.exports = loggedin;
