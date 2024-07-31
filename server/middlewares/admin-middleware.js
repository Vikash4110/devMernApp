const adminMiddleware = async (req, res, next) => {
    try {
      console.log('User from adminMiddleware:', req.user); // Log the user object to verify it
      const adminRole = req.user.isAdmin;
      if(!adminRole) {
        return res.status(403).json({ message : "Access Denied. user is not an admin." });
      }
      // return res.status(200).json({ message: req.user.isAdmin });

      next();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = adminMiddleware;
  