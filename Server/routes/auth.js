const express = require("express");
const passport = require("passport");
const usermodel = require("../models/User");
const postmodel = require("../models/Posts");
const jwt = require("jsonwebtoken");
const post = require("../models/Posts");
const company = require("../models/Companymodel");
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
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });

    if (!user) {
      // If user is not authenticated, return the failure message
      return res.json({
        success: false,
        message: info?.message || "Authentication failed",
      });
    }

    const token = user.token;

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000, // 7 days
    });

    res.redirect(`${process.env.FRONTEND_URL}`);
  })(req, res, next);
});

// Get user profile
router.get("/profile", loggedin, async (req, res) => {
  const userdata = await usermodel.findOne({ email: req.user.email });
  const user = await usermodel
    .findOne({ email: req.user.email })
    .populate("professionalexperience");

  // Extract company details
  const companies = await company.find({
    _id: { $in: user.professionalexperience },
  });
  const posts = await postmodel
    .find({ createdby: req.user.id })
    .populate({
      path: "company",
      select: "name logo",
    })
    .populate({
      path: "createdby",
      model: usermodel,
      select: "email displayName image",
    });
  res.json({ success: true, data: userdata, companies: companies , posts : posts });
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
      return res.json({
        success: true,
        message:
          "Image Changed Successfully , it will be reflected once You login again",
      });
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
      return res
        .status(500)
        .json({ success: false, message: "Error parsing form data" });
    }

    const companyName = fields.name?.[0]; // Extract company name from FormData
    if (!companyName) {
      return res
        .status(400)
        .json({ success: false, message: "Company name is required" });
    }

    if (!files.Logo) {
      return res
        .status(400)
        .json({ success: false, message: "No logo uploaded" });
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
router.post("/addprofessionalexperience", loggedin, async (req, res) => {
  const { id, linurl } = req.body;
  const user = req.user;
  const found_user = await usermodel.findOne({ email: user.email });
  if (!found_user) {
    return res.json({ success: false, message: "User not found" });
  }
  if (id) {
    if (found_user.professionalexperience.includes(id)) {
      return res.json({ success: false, message: "Company already added" });
    }
    found_user.professionalexperience.push(id);
  }
  if (linurl) {
    found_user.linurl = linurl;
  }
  await found_user.save();
  return res.json({
    success: true,
    message: "Professional Experience Added Succesfully",
  });
});
router.post("/post", loggedin, async (req, res) => {
  const user = req.user;
  const form = new formidable.IncomingForm();
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable Error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Error parsing form data" });
    }

    const company = fields.company?.[0];
    const title = fields.title?.[0];
    const html = fields.html?.[0];
    const head = fields.head?.[0];
    const cover = files.image?.[0]; // Get uploaded image file

    if (!company || !title || !html || !user || !head || !cover) {
      return res.status(400).json({ success: false, message: "Bad Auth" });
    }

    try {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(cover.filepath, {
        folder: "blog",
        resource_type: "image",
        quality: "auto:best",
      });

      // Save post to database
      const newPost = new post({
        company,
        title,
        html,
        heading: head,
        coverphoto: result.secure_url, // Store Cloudinary image URL
        createdby: user.id,
      });

      await newPost.save(); // Save to database

      return res.json({ success: true, message: "Post added successfully" });
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
