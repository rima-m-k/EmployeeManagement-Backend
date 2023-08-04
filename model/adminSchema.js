const mongoose = require("mongoose");


const admin = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    lastLogin : {
        type : Date,
        required : false
    },
    image : {
        type : String,
      
    }
})

const Admin = new mongoose.model("admin", admin)
module.exports = Admin