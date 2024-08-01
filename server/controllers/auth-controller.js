const User = require("../models/user-model");
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
  res.status(200).send("Hello World");
};

// User Registration Logic
const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({ username, email, phone, password });
    res.status(201).json({ 
      msg: "Registration Successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    }); 
  } catch (err) {
    next(err);
  }
};

// User Login Logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);
    if (isPasswordValid) {
      res.status(200).json({ 
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User Logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error from user route ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// User Profile Logic
const userProfile = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error fetching user profile: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { home, register, login, user, userProfile };
