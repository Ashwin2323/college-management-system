const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Bearer header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user payload to req
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid or expired' });
  }
};

// Middleware for role-based access
const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { protect, authorize };

// Example Usage in Routes:
// const { protect, authorize } = require('../middleware/authMiddleware');
// router.get('/profile', protect, userController.getProfile); // Protect route
// router.delete('/delete-user/:id', protect, authorize('admin'), adminController.deleteUser); // Admin-only route
