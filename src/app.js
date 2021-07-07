require('dotenv').config();
const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const bcrypt = require("bcryptjs");
const connectDB = require('./db/conn');
const Register = require("./models/Register");
const cookiePar = require("cookie-parser");
const auth = require("./middleware/auth");
let alert = require('alert');  



//connect database
connectDB();
app.use(express.json());
app.use(cookiePar());
app.use(express.urlencoded({extended:false}));


const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res) => {
    res.render("index");
});

app.get("/index_after",  (req,res) => {
    res.render("index_after");
});

app.get("/logout",auth, async(req,res) => {
    try{
        res.clearCookie("jwt");
        console.log("log out successfully");
        res.render("index");
        alert("log out successfully");

    }catch(error){
        res.status(500).send(error);
    }
});

app.get("/register",(req,res) => {
    res.render("register");
});
app.get("/sign", (req, res) => {
    res.render("sign");
});
app.get("/login",(req,res) => {
    res.render("login");
});
app.get("/about",(req,res) => {
    res.render("about");
});
app.get("/joinus",(req,res) => {
    res.render("joinus");
});

//create a new user in database
app.post('/register', async (req,res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.copassword;
        if(password === cpassword) {
            const registerEmployee = new Register({
                name: req.body.name,
                email: req.body.email,
                password: password,
                cpassword: cpassword
            })

            const token = await registerEmployee.generateAuthToken();
            res.cookie("jwt", token, {
                expire:new Date(Date.now() + 100000000),
                httpOnly:true
            });
            
            const registered = await registerEmployee.save();
            
            
            res.status(201).render("index_after");

        } else {
            res.send("password is incorrect");
        }


    }catch (error) {
        res.status(400).send(error);
    }
})

// login authentication

app.post("/login", async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Register.findOne({email:email});
        const Match = bcrypt.compare(password, userEmail.password);
        const token = await userEmail.generateAuthToken();
        res.cookie("jwt", token, {
            expire:new Date(Date.now() + 100000000),
            httpOnly:true
        });
        
        if(Match){
            res.status(201).render("index_after");
        }else {
            res.send("invalid login details");
        }

    } catch(error){
        res.status(400).send("Invalid login Details");
    }
})

app.listen(port ,() =>{
    console.log(`server is running on port ${port}`);
});
