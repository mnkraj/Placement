const express = require("express");
const passport = require("passport");
const usermodel = require("../models/User");
const jwt = require("jsonwebtoken");
const company = require("../models/Companymodel")
const formidable = require("formidable");
const cloudinary = require("../config/Cloudinary");
const loggedin = require("../Middleware/Authmiddleware");
const router = express.Router();

// Auth with Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route for Google to redirect to
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = req.user.token;

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect(`${process.env.FRONTEND_URL}`);
  }
);

// Get user profile
router.get("/profile", loggedin, (req, res) => {
  res.json({ success: true, data: req.user });
  // console.log(req.user)
});

router.post("/upload-profile-pic", loggedin, async (req, res) => {
  const user = req.user;
  const form = new formidable.IncomingForm();
  const found_user = await usermodel.findOne({ email: user.email });
  if (!found_user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error parsing form data" });
    }

    if (!files.image) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const file = files.image[0]; // Get uploaded file

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "profile_pictures", // Uploads to Cloudinary folder
        resource_type: "image",
        quality: "auto:best",
      });
      found_user.image = result.secure_url;
      await found_user.save();
      return res.json({ success: true, imageUrl: result.secure_url });
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({ success: false, message: "Upload failed" });
    }
  });
});
router.post("/add-company", loggedin, async (req, res) => {
  const user = req.user;
  const form = new formidable.IncomingForm();
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res.status(500).json({ success: false, message: "Error parsing form data" });
    }

    const companyName = fields.name?.[0]; // Extract company name from FormData
    if (!companyName) {
      return res.status(400).json({ success: false, message: "Company name is required" });
    }

    if (!files.Logo) {
      return res.status(400).json({ success: false, message: "No logo uploaded" });
    }

    const file = files.Logo[0]; // Get uploaded file

    try {
      // Upload logo to Cloudinary
      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: "company_logos", // Uploads to Cloudinary folder
        resource_type: "image",
        quality: "auto:best",
      });

      // Create a new company record in the database
      const newCompany = new company({
        name: companyName,
        logo: result.secure_url, // Store Cloudinary image URL
        createdby: user.email, // Store the ID of the user who added the company
      });

      await newCompany.save(); // Save to the database

      return res.json({ success: true, message: "Company added successfully" });
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return res.status(500).json({ success: false, message: "Upload failed" });
    }
  });
});

// Logout user
router.get("/logout", loggedin, (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ success: true, message: "User Logged Out Successfully" });
});

module.exports = router;
