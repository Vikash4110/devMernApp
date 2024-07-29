const mongoose = require('mongoose');

// const URI = "mongodb://localhost:27017/mern_admin";
const URI =process.env.MONGODB_URI;
const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed");
        console.log(error);
    }
};

module.exports = connectDb;
