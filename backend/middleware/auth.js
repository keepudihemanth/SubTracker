const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const token = authHeader.split(' ')[1];
    if (!token || token === 'null') return res.status(401).json({ message: 'No valid token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error(' Token verification failed:', err.message);
    if (err.name === 'TokenExpiredError') return res.status(401).json({ message: 'Session expired' });
    return res.status(401).json({ message: 'Invalid token' });
  }
};
