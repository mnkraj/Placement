// models/User.js
const mongoose = require('mongoose');
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
    email: {
        type: String,
        unique: true,
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
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});


const User = mongoose.model('User', userSchema);

module.exports = User;