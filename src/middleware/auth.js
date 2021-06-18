
const jwt = require("jsonwebtoken");
const Register = require("../models/Register");

const auth = async(req, res, next) =>{
    try{
        const token = req.cookies.jwt;
        const authUser = jwt.verify(token,process.env.SECRET_KEY);
        console.log(authUser);
        const user = Register.findOne({_id:authUser._id});
        console.log(user);
        req.token = token;
        req.user = user;
        next();

    }catch(error){
        res.status(401).send(error);
    }
}
module.exports = auth;