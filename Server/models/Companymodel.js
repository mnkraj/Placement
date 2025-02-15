// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { 
        type: String,
        
    },
    logo: {
        type: String
    },
    createdby:{
        type : String
    }
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});


const company = mongoose.model('company', companySchema);

module.exports = company;