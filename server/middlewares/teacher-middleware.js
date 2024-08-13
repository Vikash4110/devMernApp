const teacherMiddleware = async (req, res, next) => {
    try {
      console.log('User from teacherMiddleware:', req.user); // Log the user object to verify it
      const teacherRole = req.user.isTeacher;
      if(!teacherRole) {
        return res.status(403).json({ message : "Access Denied. user is not an teacher." });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = teacherMiddleware;