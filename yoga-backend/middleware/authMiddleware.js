const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'escape-in-yoga-super-secret-key-2026';

// Middleware to verify Admin JWT Token & 60-Minute Expiry
exports.protectAdmin = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers['x-admin-token']) {
    token = req.headers['x-admin-token'];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied: No token provided' });
  }

  try {
    // Verify standard signed JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Admin token has expired. Please log in again.' });
    }
    return res.status(401).json({ success: false, message: 'Invalid token: Unauthorized' });
  }
};
