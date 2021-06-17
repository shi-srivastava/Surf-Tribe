require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.URI;
const connectDB = async () => {
    try {
        await mongoose.connect( uri, {
            useUnifiedTopology : true,
            useCreateIndex :true,
            useNewUrlParser :true
        });
        console.log("MongoDB connected ...");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;
