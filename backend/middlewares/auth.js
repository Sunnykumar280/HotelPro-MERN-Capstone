const jwt = require('jsonwebtoken');
exports.auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).json({ message: 'Please login first' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ message: 'Invalid token' }); }
};
exports.admin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin only' });
  next();
};
