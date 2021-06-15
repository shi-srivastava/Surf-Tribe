const mongoose = require('mongoose');
const uri = "mongodb+srv://nishi_311:Nishi311@devconnector.brt9g.mongodb.net/Registers?retryWrites=true&w=majority";
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
