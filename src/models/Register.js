
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");




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
    },
    tokens:[{
        token:{
            type:String,
            require:true

        }
    }]

})

volunteerSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch(error){
        res.send(error);
        console.log(error);
    }
}
volunteerSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        this.copassword = undefined;
    }
    next();


});


const Register = new mongoose.model("Register",volunteerSchema);

module.exports = Register;