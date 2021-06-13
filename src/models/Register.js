const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    copassword:{
        type:String
    }

})

const Register = new mongoose.model("Register",volunteerSchema);

module.exports = Register;