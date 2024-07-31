const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, Token not provided" });
  }

  const jwtToken = token.replace("Bearer ", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);
    console.log('Decoded payload:', isVerified); // Log the decoded payload

    const userData = await User.findById(isVerified.userId).select({ password: 0 });
    console.log('User data:', userData); // Log the user data

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    req.token = token;
    req.user = userData;
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error); // Log the error
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
