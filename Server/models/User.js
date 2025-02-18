// models/User.js
const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: { 
        type: String,
        unique: true
    },
    email : {
        type: String,
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    professionalexperience:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "company"
    }],
    linurl :{
        type : String
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});


const User = mongoose.model('User', userSchema);

module.exports = User;