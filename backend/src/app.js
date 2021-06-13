const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();


const connectDB = require('./db/conn');
const Register = require("./models/Register");


//connect database
connectDB();
app.use(express.json());
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
    res.render("register");
});
app.get("/register",(req,res) => {
    res.render("register");
});

//create a new user in database
app.post('/', async (req,res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.password2;
        if(password === cpassword) {
            const registerEmployee = new Register()

        } else {
            res.send("password is incorrect");
        }


    }catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port ,() =>{
    console.log(`server is running on port ${port}`);
});
