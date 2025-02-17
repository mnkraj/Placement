// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
    },
    title: {
      type: String,
    },
    heading: {
      type: String,
    },
    coverphoto: {
      type: String,
    },
    html:{
        type: String,
    },
    createdby: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const post = mongoose.model("post", postSchema);

module.exports = post;
