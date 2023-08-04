const mongoose = require("mongoose");


const employee = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,

    }
})

const Employee = new mongoose.model("employee", employee)
module.exports = Employee