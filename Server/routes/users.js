const express = require("express");
const passport = require("passport");
const usermodel = require("../models/User");
const postmodel = require("../models/Posts")
const jwt = require("jsonwebtoken");
const post = require("../models/Posts");
const company = require("../models/Companymodel");
const formidable = require("formidable");
const cloudinary = require("../config/Cloudinary");
const loggedin = require("../Middleware/Authmiddleware");
const router = express.Router();


router.post("/profile",  async (req, res) => {
    const {regn} = req.body;
    const email= (regn.toLowerCase()+"@nitjsr.ac.in");
    const userdata = await usermodel.findOne({ email: email })
    const user = await usermodel
      .findOne({ email: email })
      .populate("professionalexperience");
  
    // Extract company details
    const companies = await company.find({
      _id: { $in: user.professionalexperience },
    });
    const posts = await postmodel
    .find({ createdby: user._id })
    .populate({
      path: "company",
      select: "name logo",
    })
    .populate({
      path: "createdby",
      model: usermodel,
      select: "email displayName image",
    });
    res.json({ success: true, data: userdata, companies: companies ,posts : posts });
    // console.log(req.user)
  });

  module.exports = router;