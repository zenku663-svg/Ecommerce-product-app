const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: "Admin Access Only"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = adminMiddleware;