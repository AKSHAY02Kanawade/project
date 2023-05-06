const mongoose = require('mongoose');

// Defining the Schema for different parameters of registration form
const customerSchema = new mongoose.Schema({
    Mname :{
        type : String,
        required : true,
    },
    name :{
        type : String,
        required : true,
    },
    address :{
        type : String,
        required : true,
    },
    state :{
        type : String,
        required : true,
    },
    panCard :{
        type : String,
        required : true,
        unique: true,
    },
    adharCard:{
        type : String,
        required : true,
        unique: true,
    },
    dob :{
        type : Date,
        required : true,
    },
    email : {
        type : String,
        unique : true,
        required: true,
    },
    phone : {
        type : Number,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    cpassword: {
        type : String,
        required : true
    }
});

const customerCollection = new mongoose.model('customerCollection', customerSchema);

module.exports = customerCollection;  //exporting data