const User = require("../models/user-model");
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (err) {
        console.log(err);
    }
};

// User Registration Logic
const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Check if the user already exists
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Create a new user
        const newUser = await User.create({ username, email, phone, password });

        // Respond with the created user data
        res.status(201).json({ 
            msg: "Registration Successful",
            token: await newUser.generateToken(),
            userId: newUser._id.toString(),
        }); 
    } catch (err) {
        next(err)
    }
};

// User Login Logic
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({ 
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({
                msg: "Invalid Email or Password",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// User logic

const user = async (req, res) => {
    try {
    //   const userData = await User.find({});
      const userData = req.user;
      console.log(userData);
      return res.status(200).json({ userData });
    } catch (error) {
      console.log(` error from user route ${error}`);
    }
  };
module.exports = { home, register, login, user };